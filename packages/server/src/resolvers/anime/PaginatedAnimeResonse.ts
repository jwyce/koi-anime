import { Field, ObjectType } from 'type-graphql';

import { Anime } from '../../entities/Anime';

@ObjectType()
export class PaginatedAnimeResponse {
	@Field(() => [Anime])
	anime: Anime[];

	@Field()
	hasMore: boolean;
}
