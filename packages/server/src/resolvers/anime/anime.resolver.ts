import axios from 'axios';
import dayjs from 'dayjs';
import { Character } from 'src/entities/Character';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

import { Anime } from '../../entities/Anime';
import { Song } from '../../entities/Song';
import { SongType, Status } from '../../helpers/enums';
import {
	apiAnimeFactory,
	apiCharacterFactory,
	apiSongFactory,
} from '../../utils/apiFactory';
import { PaginatedAnimeResponse } from './PaginatedAnimeResonse';

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

				const charactersResponse = await axios.get(
					`https://kitsu.io/api/edge/anime/${animeData.id}/characters`
				);
				if (charactersResponse.status === 200) {
					charactersResponse.data.data.map(async (x: any) => {
						const characterResponse = await axios.get(
							`https://kitsu.io/api/edge/anime-characters/${x.id}/character`
						);

						if (characterResponse.status === 200) {
							characters.push(apiCharacterFactory(characterResponse.data));
						}
					});
				}

				const jikanResponse = await axios.get(
					'https://api.jikan.moe/v3/search/anime',
					{
						params: {
							q: animeData.attributes.canonicalTitle,
							type: animeData.attributes.subtype,
							page: 1,
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
			// remove songs for anime slug => add new songs
			// remove characters for anime slug => add up to 10 characters
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
				const anime = animeResult.raw[0];
				return anime;
			} catch (err) {
				console.log(err);
				queryRunner.rollbackTransaction();
			}
		}

		//TODO: add error handling
		return null;
	}

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
				},
			});

			if (response.data) {
				const animeRes = (response.data.data as any[]).map((x) =>
					apiAnimeFactory(x)
				);
				return {
					anime: animeRes as any,
					hasMore: cursor + limit <= response.data.meta.count,
				};
			}
		} catch (error) {
			console.error(error);
		}
		// TODO: error handling
		return { anime: [], hasMore: false };
	}
}
