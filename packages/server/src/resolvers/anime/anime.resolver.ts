import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { Anime } from '../../entities/Anime';
import { Character } from '../../entities/Character';
import { Song } from '../../entities/Song';
import { SongType, Status } from '../../helpers/enums';
import {
	apiAnimeFactory,
	apiCharacterFactory,
	apiSongFactory,
} from '../../utils/apiFactory';
import { PaginatedResponse } from '../commonObj/PaginatedResonse';

const PaginatedAnimeResponse = PaginatedResponse(Anime);
type PaginatedAnimeResponse = InstanceType<typeof PaginatedAnimeResponse>;

@Resolver(Anime)
export class AnimeResolver {
	@Query(() => Anime, { nullable: true })
	async anime(
		@Arg('slug') slug: string,
		@Arg('apiID', () => Int) apiID: number
	): Promise<Anime | null> {
		const existingAnime = await Anime.findOne({ where: { slug } });
		if (
			existingAnime &&
			existingAnime.updatedAt > dayjs().subtract(7, 'day').toDate()
		) {
			return existingAnime;
		}

		let newAnime;
		let songs = [];
		let characters: any[] = [];
		try {
			const response = await axios.get(
				`https://kitsu.io/api/edge/anime/${apiID}`
			);

			if (response.status === 200) {
				const animeData = response.data.data;
				newAnime = apiAnimeFactory(animeData);

				const jikanResponse = await axios.get(
					'https://api.jikan.moe/v3/search/anime/',
					{
						params: {
							q: animeData.attributes.titles.en,
							page: 1,
							type: animeData.attributes.subtype,
						},
					}
				);
				if (jikanResponse.status === 200) {
					const malId = jikanResponse.data.results[0].mal_id;
					const jikanAnimeRes = await axios.get(
						`https://api.jikan.moe/v3/anime/${malId}`
					);
					if (jikanAnimeRes.status === 200) {
						newAnime.studios = jikanAnimeRes.data.studios.map(
							(x: any) => x.name
						);

						songs.push(
							...jikanAnimeRes.data.opening_themes.map((x: any) =>
								apiSongFactory(x, SongType.OP)
							),
							...jikanAnimeRes.data.ending_themes.map((x: any) =>
								apiSongFactory(x, SongType.ED)
							)
						);
					}
				}

				const charactersResponse = await axios.post(
					'https://kitsu.io/api/graphql',
					{
						query: `query searchtitle($slug: String!) {
              searchAnimeByTitle(first: 2, title: $slug) {
                nodes {
                  slug
                  characters (first:100) {
                    nodes{
                      id
                      role
                      character {
                        id        
                        slug
                        description
                        names {
                          canonical
                          localized
                        }
                        image {
                          original {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`,
						variables: {
							slug: newAnime.slug,
						},
					}
				);

				const animeSlug = newAnime.slug;
				if (charactersResponse.status === 200) {
					charactersResponse.data.data.searchAnimeByTitle.nodes
						.find((node: any) => node.slug === animeSlug)
						.characters.nodes.forEach((x: any) => {
							characters.push(apiCharacterFactory(x.character, x.id));
						});
				}
			}
		} catch (error) {
			console.error(error);
		}

		if (
			existingAnime &&
			existingAnime.updatedAt < dayjs().subtract(7, 'day').toDate() &&
			existingAnime.status !== Status.FINISHED
		) {
			// update anime fields
			return newAnime as Anime;
		} else if (!existingAnime && newAnime) {
			const connection = getConnection();
			const queryRunner = connection.createQueryRunner();
			queryRunner.startTransaction();

			try {
				const animeResult = await connection
					.createQueryBuilder(queryRunner)
					.insert()
					.into(Anime)
					.values(newAnime)
					.returning('*')
					.execute();

				const anime = animeResult.raw[0] as Anime;
				songs.forEach((x) => {
					x.animeID = anime.id;
					x.animeAPIID = anime.apiID;
				});
				characters.forEach((x) => {
					x.animeID = anime.id;
					x.animeAPIID = anime.apiID;
				});
				characters = _.uniqBy(characters, 'apiID').filter(
					(x) => x.description !== '' && x.imageOriginal !== ''
				);

				await connection
					.createQueryBuilder(queryRunner)
					.insert()
					.into(Song)
					.values(songs)
					.returning('*')
					.execute();
				await connection
					.createQueryBuilder(queryRunner)
					.insert()
					.into(Character)
					.values(characters)
					.returning('*')
					.execute();

				queryRunner.commitTransaction();
				return anime;
			} catch (err) {
				console.log(err);
				queryRunner.rollbackTransaction();
			}
		}

		//TODO: add error handling
		return null;
	}

	//TODO: filter by nsfw authenticate with kistu api?
	@Query(() => PaginatedAnimeResponse)
	async kitsuSearchAnime(
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => Int) cursor: number,
		@Arg('filter', () => String, { nullable: true }) filter: string | null
	): Promise<PaginatedAnimeResponse> {
		try {
			const response = await axios.get('https://kitsu.io/api/edge/anime/', {
				params: {
					'page[limit]': limit,
					'page[offset]': cursor,
					...(filter && { 'filter[text]': filter }),
					...(!filter && { sort: 'popularityRank,ratingRank,-favoritesCount' }),
				},
			});

			if (response.data) {
				const animeRes = (response.data.data as any[]).map((x) =>
					apiAnimeFactory(x)
				) as Anime[];
				animeRes.forEach((x) => {
					x.id = x.apiID;
				});

				return {
					items: animeRes as Anime[],
					total: response.data.meta.count,
					hasMore: cursor + limit <= response.data.meta.count,
				};
			}
		} catch (error) {
			console.error(error);
		}
		// TODO: error handling
		return { items: [], total: 0, hasMore: false };
	}
}
