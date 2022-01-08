import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection, In, Not } from 'typeorm';

import { Anime } from '../../entities/Anime';
import { Character } from '../../entities/Character';
import { List } from '../../entities/List';
import { Manga } from '../../entities/Manga';
import { Song } from '../../entities/Song';
import { User } from '../../entities/User';
import { Vote } from '../../entities/Vote';
import { ListStatus, Media, ResourceType, SongType } from '../../helpers/enums';
import { isAuth } from '../../middleware/isAuth';
import { rateLimit } from '../../middleware/rateLimit';
import { GetTop5ForUser, GetTopRatedResouces } from '../../repo/TopRatedRepo';
import { MyContext } from '../../typings/MyContext';
import { getPreferredName } from '../../utils/getPreferredName';
import { getRandomMatchup } from '../../utils/getRandomMatchup';
import { PaginatedResponse } from '../commonObj/PaginatedResonse';
import { Matchup, RankedResource, Resource } from './Matchup';

const PaginatedRankedResponse = PaginatedResponse(RankedResource);
type PaginatedRankedResponse = InstanceType<typeof PaginatedRankedResponse>;

@Resolver(Vote)
export class VoteResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(rateLimit(1000))
	@UseMiddleware(isAuth)
	async vote(
		@Arg('votedFor') votedFor: string,
		@Arg('votedAgainst') votedAgainst: string,
		@Arg('type', () => ResourceType) type: ResourceType,
		@Ctx() { req }: MyContext
	) {
		const existing = await Vote.findOne({
			where: {
				votedFor,
				votedAgainst,
				userID: req.session.userId,
				resourceType: type,
			},
		});

		if (existing) {
			existing.count++;
			existing.save();
		} else {
			await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Vote)
				.values({
					count: 1,
					votedAgainst,
					votedFor,
					resourceType: type,
					userID: req.session.userId,
				})
				.returning('*')
				.execute();
		}
		return true;
	}

	@Query(() => [RankedResource])
	@UseMiddleware(isAuth)
	async getUserTop5(
		@Arg('type', () => ResourceType) type: ResourceType,
		@Ctx() { req }: MyContext
	): Promise<RankedResource[]> {
		const user = await User.findOne({ where: { id: req.session.userId } });
		const votes = await GetTop5ForUser(type, req.session.userId);
		let resources: RankedResource[] = [];

		if (type === ResourceType.ANIME) {
			const anime = await Anime.find({
				where: { slug: In(votes.map((x) => x.slug)) },
			});
			votes.forEach((x) => {
				const animeInfo = anime.find((y) => x.slug === y.slug);
				if (animeInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							animeInfo.englishTitle,
							animeInfo.japaneseTitle,
							animeInfo.romajiTitle,
							animeInfo.canonicalTitle
						),
						imageUrl: animeInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		} else if (type === ResourceType.MANGA) {
			const manga = await Manga.find({
				where: { slug: In(votes.map((x) => x.slug)) },
			});
			votes.forEach((x) => {
				const mangaInfo = manga.find((y) => x.slug === y.slug);
				if (mangaInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							mangaInfo.englishTitle,
							mangaInfo.japaneseTitle,
							mangaInfo.romajiTitle,
							mangaInfo.canonicalTitle
						),
						imageUrl: mangaInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		} else if (type === ResourceType.ED_SONG || type === ResourceType.OP_SONG) {
			const songs = await Song.find({
				where: {
					slug: In(votes.map((x) => x.slug)),
					songType: ResourceType.OP_SONG ? SongType.OP : SongType.ED,
				},
			});
			const anime = await Anime.find({
				where: {
					id: In(songs.map((y) => y.animeID)),
				},
			});
			votes.forEach((x) => {
				const songInfo = songs.find((y) => x.slug === y.slug);
				const animeInfo = anime.find((y) => songInfo?.animeID === y.id);
				if (animeInfo && songInfo) {
					resources.push({
						name: songInfo?.fullTitle ?? '',
						imageUrl: animeInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
						animeSlug: animeInfo.slug,
					});
				}
			});
		} else if (
			type === ResourceType.F_CHARACTER ||
			type === ResourceType.M_CHARACTER
		) {
			const characters = await Character.find({
				where: {
					slug: In(votes.map((x) => x.slug)),
					gender: type === ResourceType.F_CHARACTER ? 'female' : 'male',
				},
			});
			votes.forEach((x) => {
				const characterInfo = characters.find((y) => x.slug === y.slug);
				if (characterInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							characterInfo.englishName,
							characterInfo.japaneseName,
							characterInfo.canonicalName,
							characterInfo.canonicalName
						),
						imageUrl: characterInfo.imageOriginal,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		}

		return resources.slice(0, 5);
	}

	@Query(() => PaginatedRankedResponse)
	@UseMiddleware(isAuth)
	async getTopRated(
		@Arg('type', () => ResourceType) type: ResourceType,
		@Arg('limit', () => Int) limit: number,
		@Arg('offset', () => Int) offset: number,
		@Ctx() { req }: MyContext
	): Promise<PaginatedRankedResponse> {
		const realLimit = Math.min(50, limit);
		const realOffset = Math.min(200 - limit, offset);

		const user = await User.findOne({ where: { id: req.session.userId } });
		const votes = await GetTopRatedResouces(type, realLimit, realOffset);
		let resources: RankedResource[] = [];

		if (type === ResourceType.ANIME) {
			const anime = await Anime.find({
				where: { slug: In(votes.map((x) => x.slug)) },
			});
			votes.forEach((x) => {
				const animeInfo = anime.find((y) => x.slug === y.slug);
				if (animeInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							animeInfo.englishTitle,
							animeInfo.japaneseTitle,
							animeInfo.romajiTitle,
							animeInfo.canonicalTitle
						),
						imageUrl: animeInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		} else if (type === ResourceType.MANGA) {
			const manga = await Manga.find({
				where: { slug: In(votes.map((x) => x.slug)) },
			});
			votes.forEach((x) => {
				const mangaInfo = manga.find((y) => x.slug === y.slug);
				if (mangaInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							mangaInfo.englishTitle,
							mangaInfo.japaneseTitle,
							mangaInfo.romajiTitle,
							mangaInfo.canonicalTitle
						),
						imageUrl: mangaInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		} else if (type === ResourceType.ED_SONG || type === ResourceType.OP_SONG) {
			const songs = await Song.find({
				where: {
					slug: In(votes.map((x) => x.slug)),
					songType: ResourceType.OP_SONG ? SongType.OP : SongType.ED,
				},
			});
			const anime = await Anime.find({
				where: {
					id: In(songs.map((y) => y.animeID)),
				},
			});
			votes.forEach((x) => {
				const songInfo = songs.find((y) => x.slug === y.slug);
				const animeInfo = anime.find((y) => songInfo?.animeID === y.id);
				if (animeInfo && songInfo) {
					resources.push({
						name: songInfo?.fullTitle ?? '',
						imageUrl: animeInfo.posterLinkSmall,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
						animeSlug: animeInfo.slug,
					});
				}
			});
		} else if (
			type === ResourceType.F_CHARACTER ||
			type === ResourceType.M_CHARACTER
		) {
			const characters = await Character.find({
				where: {
					slug: In(votes.map((x) => x.slug)),
					gender: type === ResourceType.F_CHARACTER ? 'female' : 'male',
				},
			});
			votes.forEach((x) => {
				const characterInfo = characters.find((y) => x.slug === y.slug);
				if (characterInfo) {
					resources.push({
						name: getPreferredName(
							user ?? null,
							characterInfo.englishName,
							characterInfo.japaneseName,
							characterInfo.canonicalName,
							characterInfo.canonicalName
						),
						imageUrl: characterInfo.imageOriginal,
						slug: x.slug,
						type,
						rank: x.approval_rank,
						approval: x.approval,
					});
				}
			});
		}

		return {
			items: resources.slice(0, realLimit),
			hasMore: resources.slice(0, realLimit).length === realLimit,
			nextCursor: realOffset + realLimit,
		};
	}

	@Query(() => Matchup, { nullable: true })
	@UseMiddleware(isAuth)
	async getMatchup(
		@Arg('type', () => ResourceType) type: ResourceType,
		@Ctx() { req }: MyContext
	): Promise<Matchup | null> {
		const me = await User.findOne({ where: { id: req.session.userId } });
		const list = await List.find({
			where: {
				userID: req.session.userId,
				...(type === ResourceType.MANGA
					? { mediaType: Media.MANGA }
					: { mediaType: Media.ANIME }),
				status: Not(ListStatus.PLANNED),
			},
		});

		if (type === ResourceType.ANIME) {
			const slugs = list.map((x) => x.resourceSlug);
			const options: Resource[] = (
				await Anime.find({ where: { slug: In(slugs) } })
			).map((x) => ({
				name: getPreferredName(
					me ?? null,
					x.englishTitle,
					x.japaneseTitle,
					x.romajiTitle,
					x.canonicalTitle
				),
				imageUrl: x.posterLinkSmall,
				slug: x.slug,
				type: ResourceType.ANIME,
			}));

			return getRandomMatchup(options);
		} else if (type === ResourceType.MANGA) {
			const slugs = list.map((x) => x.resourceSlug);
			const options: Resource[] = (
				await Manga.find({ where: { slug: In(slugs) } })
			).map((x) => ({
				name: getPreferredName(
					me ?? null,
					x.englishTitle,
					x.japaneseTitle,
					x.romajiTitle,
					x.canonicalTitle
				),
				imageUrl: x.posterLinkSmall,
				slug: x.slug,
				type: ResourceType.MANGA,
			}));

			return getRandomMatchup(options);
		} else if (
			type === ResourceType.F_CHARACTER ||
			type === ResourceType.M_CHARACTER
		) {
			const slugs = list.map((x) => x.resourceSlug);
			const animeIds = (await Anime.find({ where: { slug: In(slugs) } })).map(
				(x) => x.id
			);
			const options: Resource[] = (
				await Character.find({
					where: {
						animeID: In(animeIds),
						...(type === ResourceType.F_CHARACTER
							? { gender: 'female' }
							: { gender: 'male' }),
					},
				})
			).map((x) => ({
				name: getPreferredName(
					me ?? null,
					x.englishName,
					x.japaneseName,
					x.canonicalName,
					x.canonicalName
				),
				imageUrl: x.imageOriginal,
				slug: x.slug,
				...(type === ResourceType.F_CHARACTER
					? { type: ResourceType.F_CHARACTER }
					: { type: ResourceType.M_CHARACTER }),
			}));

			return getRandomMatchup(options);
		} else if (type === ResourceType.OP_SONG || type === ResourceType.ED_SONG) {
			const slugs = list.map((x) => x.resourceSlug);
			const anime = (await Anime.find({ where: { slug: In(slugs) } })).map(
				(x) => ({ id: x.id, image: x.posterLinkSmall })
			);
			const options: Resource[] = (
				await Song.find({
					where: {
						animeID: In(anime.map((x) => x.id)),
						...(type === ResourceType.OP_SONG
							? { songType: SongType.OP }
							: { songType: SongType.ED }),
					},
				})
			).map((x) => ({
				name: x.fullTitle,
				imageUrl: anime.find((y) => y.id === x.animeID)?.image ?? '',
				slug: x.slug,
				...(type === ResourceType.OP_SONG
					? { type: ResourceType.OP_SONG }
					: { type: ResourceType.ED_SONG }),
			}));

			return getRandomMatchup(options);
		}

		return null;
	}
}
