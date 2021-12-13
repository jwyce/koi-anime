import { AgeRating, Status } from './../../helpers/enums';
import { PaginatedAnimeResponse } from './PaginatedAnimeResonse';
import { Anime } from '../../entities/Anime';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import axios from 'axios';
import { AnimeSubtype } from '../../helpers/enums';

@Resolver(Anime)
export class AnimeResolver {
	@Query(() => Anime, { nullable: true })
	anime() {
		return Anime.findOne(0);
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
				const animeRes = (response.data.data as any[]).map((a) => ({
					id: 0,
					apiID: a.id as number,
					subtype:
						(a.attributes.subtype?.toLowerCase() as AnimeSubtype) ??
						AnimeSubtype.TV,
					synopsis: (a.attributes.synopsis as string) ?? '',
					englishTitle: (a.attributes.titles.en as string) ?? '',
					romajiTitle: (a.attributes.titles.en_jp as string) ?? '',
					japaneseTitle: (a.attributes.titles.ja_jp as string) ?? '',
					canonicalTitle: (a.attributes.canonicalTitle as string) ?? '',
					slug: a.attributes.slug as string,
					startDate: (a.attributes.startDate as Date) ?? Date.now(),
					endDate: (a.attributes.endDate as Date) ?? Date.now(),
					tba: a.attributes.tba ?? '',
					ageRating:
						(a.attributes.ageRating?.toLowerCase() as AgeRating) ?? AgeRating.G,
					ageRatingGuide: a.attributes.ageRatingGuide ?? '',
					status: (a.attributes.status?.toLowerCase() as Status) ?? Status.TBA,
					posterLinkOriginal: a.attributes.posterImage.original ?? '',
					posterLinkSmall: a.attributes.posterImage.small ?? '',
					coverLinkOriginal:
						a.attributes.coverImage?.original ??
						'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
					coverLinkSmall:
						a.attributes.coverImage?.small ??
						'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
					youtubeVideoId: a.attributes.youtubeVideoId ?? '',
					studios: [],
					nsfw: a.attributes.nsfw ?? false,
				}));
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

	@Query(() => Anime)
	async kitsuGetAnime(@Arg('id', () => Int) id: number): Promise<Anime> {
		try {
			const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);
			let studios = [];
			let songs = [];
			let characters = [];

			if (response.status === 200) {
				const a = response.data.data;
				const jikanResponse = await axios.get(
					'https://api.jikan.moe/v3/search/anime',
					{
						params: {
							q: a.attributes.canonicalTitle,
							page: 1,
							type: a.attributes.subtype,
						},
					}
				);
				if (jikanResponse.status === 200) {
					const malId = jikanResponse.data.results[0].mal_id;
					const jikanAnimeRes = await axios.get(
						`https://api.jikan.moe/v3/anime/${malId}`
					);
					if (jikanAnimeRes.status === 200) {
						studios = jikanAnimeRes.data.studios.map((x: any) => x.name);
					}
				}

				const animeRes = {
					id: 0,
					apiID: a.id as number,
					subtype:
						(a.attributes.subtype?.toLowerCase() as AnimeSubtype) ??
						AnimeSubtype.TV,
					synopsis: (a.attributes.synopsis as string) ?? '',
					englishTitle: (a.attributes.titles.en as string) ?? '',
					romajiTitle: (a.attributes.titles.en_jp as string) ?? '',
					japaneseTitle: (a.attributes.titles.ja_jp as string) ?? '',
					canonicalTitle: (a.attributes.canonicalTitle as string) ?? '',
					slug: a.attributes.slug as string,
					startDate: (a.attributes.startDate as Date) ?? Date.now(),
					endDate: (a.attributes.endDate as Date) ?? Date.now(),
					tba: a.attributes.tba ?? '',
					ageRating:
						(a.attributes.ageRating?.toLowerCase() as AgeRating) ?? AgeRating.G,
					ageRatingGuide: a.attributes.ageRatingGuide ?? '',
					status: (a.attributes.status?.toLowerCase() as Status) ?? Status.TBA,
					posterLinkOriginal: a.attributes.posterImage.original ?? '',
					posterLinkSmall: a.attributes.posterImage.small ?? '',
					coverLinkOriginal: a.attributes.coverImage.original ?? '',
					coverLinkSmall: a.attributes.coverImage.small ?? '',
					youtubeVideoId: a.attributes.youtubeVideoId ?? '',
					studios,
					nsfw: a.attributes.nsfw ?? false,
				};

				return animeRes as any;
			}
		} catch (error) {
			console.error(error);
		}
		// TODO: error handling
		return null as any;
	}
}
