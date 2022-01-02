import axios from 'axios';
import dayjs from 'dayjs';
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';

import { Manga } from '../../entities/Manga';
import { ResourceType, Status } from '../../helpers/enums';
import { Rank } from '../../loaders/createRankLoader';
import { MyContext } from '../../typings/MyContext';
import { apiMangaFactory, apiSearchMangaFactory } from '../../utils/apiFactory';
import { PaginatedResponse } from '../commonObj/PaginatedResonse';

const PaginatedMangaResponse = PaginatedResponse(Manga);
type PaginatedMangaResponse = InstanceType<typeof PaginatedMangaResponse>;

@Resolver(Manga)
export class MangaResolver {
	@FieldResolver(() => Rank, { nullable: true })
	async rank(@Root() manga: Manga, @Ctx() { rankLoader }: MyContext) {
		return rankLoader.load({ slugId: manga.slug, type: ResourceType.MANGA });
	}

	@Query(() => Manga, { nullable: true })
	async manga(@Arg('slug') slug: string): Promise<Manga | null> {
		const existingManga = await Manga.findOne({ where: { slug } });
		if (
			existingManga &&
			(existingManga.updatedAt > dayjs().subtract(7, 'day').toDate() ||
				existingManga.status === Status.FINISHED)
		) {
			return existingManga;
		}

		let newManga;
		try {
			const response = await axios.post('https://kitsu.io/api/graphql', {
				query: `query FindMange($slug: String!) {
              findMangaBySlug(slug: $slug) {
                id
                subtype
                description
                titles {
                  canonical
                  localized 
                }
                slug
                startDate
                endDate
                tba
                ageRating
                ageRatingGuide
                status
                posterImage {
                  original {
                    url
                  }
                  views {
                    url
                  }
                }
                bannerImage {
                  original {
                    url
                  }
                }
                volumeCount
                chapterCount
              }
            }`,
				variables: {
					slug,
				},
			});

			if (response.status === 200) {
				const mangaData = response.data.data.findMangaBySlug;
				newManga = apiMangaFactory(mangaData);
			}

			const r = await axios.get(
				`https://kitsu.io/api/edge/manga/${newManga?.apiID}`
			);

			if (newManga && r.status === 200) {
				newManga.serialization = r.data.data.attributes.serialization ?? '';
			}
		} catch (error) {
			console.error(error);
		}

		if (
			existingManga &&
			existingManga.updatedAt < dayjs().subtract(7, 'day').toDate() &&
			existingManga.status !== Status.FINISHED
		) {
			const mangaResult = await Manga.update(existingManga.id, {
				...newManga,
				id: existingManga.id,
			});
			return mangaResult.raw[0] as Manga;
		} else if (!existingManga && newManga) {
			try {
				const mangaResult = await getConnection()
					.createQueryBuilder()
					.insert()
					.into(Manga)
					.values(newManga)
					.returning('*')
					.execute();

				return mangaResult.raw[0] as Manga;
			} catch (err) {
				console.log(err);
			}
		}

		//TODO: add error handling
		return null;
	}

	@Query(() => PaginatedMangaResponse)
	async kitsuSearchManga(
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => Int) cursor: number,
		@Arg('filter', () => String, { nullable: true }) filter: string | null
	): Promise<PaginatedMangaResponse> {
		try {
			const response = await axios.get('https://kitsu.io/api/edge/manga/', {
				params: {
					'page[limit]': limit,
					'page[offset]': cursor,
					...(filter && { 'filter[text]': filter }),
					...(!filter && { sort: 'popularityRank,ratingRank,-favoritesCount' }),
				},
			});

			if (response.data) {
				const mangaRes = (response.data.data as any[]).map((x) =>
					apiSearchMangaFactory(x)
				) as Manga[];
				mangaRes.forEach((x) => {
					x.id = x.apiID;
				});

				return {
					items: mangaRes,
					nextCursor: cursor + limit,
					hasMore: cursor + limit <= response.data.meta.count,
				};
			}
		} catch (error) {
			console.error(error);
		}
		// TODO: error handling
		return { items: [], nextCursor: 0, hasMore: false };
	}
}
