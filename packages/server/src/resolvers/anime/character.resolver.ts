import { Arg, Int, Query, Resolver } from 'type-graphql';

import { Character } from '../../entities/Character';

@Resolver()
export class CharacterResolver {
	@Query(() => [Character])
	charactersForAnime(@Arg('id', () => Int) id: number) {
		return Character.find({ where: { animeID: id } });
	}
}
