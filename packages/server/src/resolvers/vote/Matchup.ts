import { ResourceType } from '../../helpers/enums';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Resource {
	@Field()
	slug: string;

	@Field()
	name: string;

	@Field()
	imageUrl: string;

	@Field(() => ResourceType)
	type: ResourceType;
}

@ObjectType()
export class Matchup {
	@Field(() => Resource)
	first: Resource;

	@Field(() => Resource)
	second: Resource;
}
