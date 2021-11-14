import { Anime } from '../entities/Anime';
import { Query, Resolver } from 'type-graphql';

@Resolver(Anime)
export class AnimeResolver {
	@Query(() => Anime, { nullable: true })
	anime() {
		return Anime.findOne(0);
	}
}
