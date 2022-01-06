import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Like } from 'typeorm';

import { Anime } from '../../entities/Anime';
import { List } from '../../entities/List';
import { Manga } from '../../entities/Manga';
import { User } from '../../entities/User';
import { Direction, ListStatus, Media, SortBy } from '../../helpers/enums';
import { MyContext } from '../../typings/MyContext';
import { PaginatedResponse } from '../commonObj/PaginatedResonse';
import { ListFilterInput } from './ListFilterInput';
import { ListStatusCount } from './ListStatusCount';
import { UpdateListInput } from './UpdateListInput';

const PaginatedListResponse = PaginatedResponse(List);
type PaginatedListResponse = InstanceType<typeof PaginatedListResponse>;

@Resolver(List)
export class ListResolver {
	@FieldResolver(() => Anime, { nullable: true })
	async anime(@Root() list: List, @Ctx() { animeLoader }: MyContext) {
		if (list.mediaType === Media.ANIME) {
			return animeLoader.load(list.resourceSlug);
		}
		return null;
	}

	@FieldResolver(() => Manga, { nullable: true })
	async manga(@Root() list: List, @Ctx() { mangaLoader }: MyContext) {
		if (list.mediaType === Media.MANGA) {
			return mangaLoader.load(list.resourceSlug);
		}
		return null;
	}

	@Query(() => List, { nullable: true })
	async myListEntryStatus(
		@Arg('slug') slug: string,
		@Arg('type', () => Media) type: Media,
		@Ctx() { req }: MyContext
	): Promise<List | null> {
		const listEntry = await List.findOne({
			where: {
				userID: req.session.userId,
				resourceSlug: slug,
				mediaType: type,
			},
		});
		return listEntry ?? null;
	}

	@Query(() => [ListStatusCount])
	async userListStatusCounts(
		@Arg('username') username: string,
		@Arg('media', () => Media) media: Media
	): Promise<ListStatusCount[]> {
		const user = await User.findOne({ where: { username } });
		if (!user) {
			throw new Error('user does not exist');
		}

		let result: ListStatusCount[] = [];

		await Promise.all(
			Object.values(ListStatus).map(async (status) => {
				const count = await List.count({
					where: { userID: user.id, status, mediaType: media },
				});
				result.push({ status, count });
			})
		);

		return result;
	}

	@Query(() => PaginatedListResponse)
	async userList(
		@Arg('options') options: ListFilterInput
	): Promise<PaginatedListResponse> {
		const user = await User.findOne({ where: { username: options.username } });
		if (user) {
			// TODO: add better title filtering, order by length
			const realLimit = Math.min(50, options.limit);
			const realLimitPlusOne = realLimit + 1;
			const mediaType = options.media ?? Media.ANIME;
			const direction = options.direction === Direction.ASC ? 'ASC' : 'DESC';

			const listItems = await List.find({
				where: {
					userID: user.id,
					mediaType,
					...(options.status && { status: options.status }),
					...(options.title && { resourceSlug: Like(`%${options.title}%`) }),
				},
				order: {
					status: 'ASC',
					...(options.sort === SortBy.ADDED && { createdAt: direction }),
					...(options.sort === SortBy.TITLE && { resourceSlug: direction }),
					...(options.sort === SortBy.UPDATED && { updatedAt: direction }),
					...(options.sort === SortBy.PROGRESS &&
						mediaType === Media.ANIME && { currentEpisode: direction }),
					...(options.sort === SortBy.PROGRESS &&
						mediaType === Media.MANGA && { currentChapter: direction }),
				},
				skip: options.cursor ?? 0,
				take: realLimitPlusOne,
			});
			return {
				items: listItems.slice(0, realLimit),
				hasMore: listItems.length === realLimitPlusOne,
				nextCursor: realLimit + (options.cursor ?? 0),
			};
		}

		//TODO: add error handling
		return { items: [], hasMore: false, nextCursor: 0 };
	}

	@Mutation(() => List)
	async addUpdateMyList(
		@Arg('options') options: UpdateListInput,
		@Ctx() { req }: MyContext
	): Promise<List> {
		const listEntry = await List.findOne({
			where: {
				userID: req.session.userId,
				resourceSlug: options.slug,
				mediaType: options.type,
			},
		});

		if (options.type === Media.ANIME) {
			const resource = await Anime.findOne({ where: { slug: options.slug } });
			if (resource && resource.episodeCount > 0) {
				if (options.episodeCount >= resource.episodeCount) {
					options.status = ListStatus.COMPLETED;
					options.episodeCount = resource.episodeCount;
				}
				if (options.status === ListStatus.COMPLETED) {
					options.episodeCount = resource.episodeCount;
				}
				if (options.episodeCount < resource.episodeCount) {
					options.status = ListStatus.CURRENT;
				}
			}
		} else {
			const resource = await Manga.findOne({ where: { slug: options.slug } });
			if (resource && resource.chapterCount > 0) {
				if (options.chapterCount >= resource.chapterCount) {
					options.status = ListStatus.COMPLETED;
					options.chapterCount = resource.chapterCount;
				}
				if (options.status === ListStatus.COMPLETED) {
					options.chapterCount = resource.chapterCount;
				}
				if (options.chapterCount < resource.chapterCount) {
					options.status = ListStatus.CURRENT;
				}
			}
		}

		if (listEntry) {
			if (options.status) listEntry.status = options.status;
			if (options.episodeCount !== undefined)
				listEntry.currentEpisode = Math.max(0, options.episodeCount);
			if (options.chapterCount !== undefined)
				listEntry.currentChapter = Math.max(0, options.chapterCount);
			listEntry.save();
			return listEntry;
		}

		return List.create({
			userID: req.session.userId,
			resourceSlug: options.slug,
			mediaType: options.type,
			...(options.status && { status: options.status }),
			...(options.episodeCount && {
				currentEpisode: Math.max(0, options.episodeCount),
			}),
			...(options.chapterCount && {
				currentChapter: Math.max(0, options.chapterCount),
			}),
		}).save();
	}

	@Mutation(() => Boolean)
	async deleteListEntry(
		@Arg('slug') slug: string,
		@Arg('type', () => Media) type: Media,
		@Ctx() { req }: MyContext
	) {
		await List.delete({
			userID: req.session.userId,
			resourceSlug: slug,
			mediaType: type,
		});

		return true;
	}
}
