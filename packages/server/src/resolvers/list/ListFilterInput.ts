import { Media, SortBy, ListStatus, Direction } from '../../helpers/enums';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ListFilterInput {
	@Field()
	username: string;

	@Field(() => Int)
	limit: number;

	@Field(() => Int, { nullable: true })
	cursor: number;

	@Field(() => String, { nullable: true })
	title: string;

	@Field(() => SortBy, { nullable: true })
	sort: SortBy;

	@Field(() => Media, { nullable: true })
	media: Media;

	@Field(() => ListStatus, { nullable: true })
	status: ListStatus;

	@Field(() => Direction, { nullable: true })
	direction: Direction;
}
