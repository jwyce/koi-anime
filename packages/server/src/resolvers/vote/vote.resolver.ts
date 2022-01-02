import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection, In } from 'typeorm';

import { Anime } from '../../entities/Anime';
import { Character } from '../../entities/Character';
import { List } from '../../entities/List';
import { Manga } from '../../entities/Manga';
import { Song } from '../../entities/Song';
import { User } from '../../entities/User';
import { Vote } from '../../entities/Vote';
import { Media, ResourceType, SongType } from '../../helpers/enums';
import { MyContext } from '../../typings/MyContext';
import { getRandomMatchup } from '../../utils/getRandomMatchup';
import { getPreferredName } from '../../utils/getPreferredName';
import { Matchup, Resource } from './Matchup';

@Resolver(Vote)
export class VoteResolver {
	@Mutation(() => Boolean)
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

	@Query(() => Matchup, { nullable: true })
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
