import axios from 'axios';
import { Arg, Int, Query, Resolver } from 'type-graphql';

import { Manga } from '../../entities/Manga';
import { apiMangaFactory } from '../../utils/apiFactory';
import { PaginatedResponse } from '../commonObj/PaginatedResonse';

const PaginatedMangaResponse = PaginatedResponse(Manga);
type PaginatedMangaResponse = InstanceType<typeof PaginatedMangaResponse>;

//TODO: add resolver to get manga detail

@Resolver()
export class MangaResolver {
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
					apiMangaFactory(x)
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
