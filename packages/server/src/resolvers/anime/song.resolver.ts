import { Arg, Int, Query, Resolver } from 'type-graphql';

import { Song } from '../../entities/Song';

@Resolver()
export class SongResolver {
	@Query(() => [Song])
	songsForAnime(@Arg('id', () => Int) id: number) {
		return Song.find({ where: { animeID: id } });
	}
}
