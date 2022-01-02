import { ResourceType } from './../../helpers/enums';
import { Rank } from '../../loaders/createRankLoader';
import { MyContext } from '../../typings/MyContext';
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
} from 'type-graphql';

import { Character } from '../../entities/Character';

@Resolver(Character)
export class CharacterResolver {
	@FieldResolver(() => Rank, { nullable: true })
	async rank(@Root() character: Character, @Ctx() { rankLoader }: MyContext) {
		let type: ResourceType | null = null;
		if (character.gender === 'female') {
			type = ResourceType.F_CHARACTER;
		} else if (character.gender === 'male') {
			type = ResourceType.M_CHARACTER;
		}

		return rankLoader.load({
			slugId: character.slug,
			type,
		});
	}

	@Query(() => [Character])
	charactersForAnime(@Arg('id', () => Int) id: number) {
		return Character.find({ where: { animeID: id } });
	}

	@Query(() => [Character])
	femalesForAnime(@Arg('id', () => Int) id: number) {
		return Character.find({ where: { animeID: id, gender: 'female' } });
	}

	@Query(() => [Character])
	malesForAnime(@Arg('id', () => Int) id: number) {
		return Character.find({ where: { animeID: id, gender: 'male' } });
	}

	@Query(() => Character)
	character(@Arg('slug') slug: string) {
		return Character.findOne({ slug });
	}
}
