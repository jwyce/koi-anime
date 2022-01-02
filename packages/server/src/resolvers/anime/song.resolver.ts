import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
} from 'type-graphql';

import { Song } from '../../entities/Song';
import { ResourceType, SongType } from '../../helpers/enums';
import { Rank } from '../../loaders/createRankLoader';
import { MyContext } from '../../typings/MyContext';

@Resolver(Song)
export class SongResolver {
	@FieldResolver(() => Rank, { nullable: true })
	async rank(@Root() song: Song, @Ctx() { rankLoader }: MyContext) {
		let type: ResourceType | null = null;
		if (song.songType === SongType.OP) {
			type = ResourceType.OP_SONG;
		} else if (song.songType === SongType.ED) {
			type = ResourceType.ED_SONG;
		}

		return rankLoader.load({
			slugId: song.slug,
			type,
		});
	}

	@Query(() => [Song])
	songsForAnime(@Arg('id', () => Int) id: number) {
		return Song.find({ where: { animeID: id } });
	}

	@Query(() => [Song])
	openingsForAnime(@Arg('id', () => Int) id: number) {
		return Song.find({ where: { animeID: id, songType: SongType.OP } });
	}

	@Query(() => [Song])
	endingsForAnime(@Arg('id', () => Int) id: number) {
		return Song.find({ where: { animeID: id, songType: SongType.ED } });
	}
}
