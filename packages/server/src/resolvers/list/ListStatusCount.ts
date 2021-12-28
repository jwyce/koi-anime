import { ListStatus } from '../../helpers/enums';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ListStatusCount {
	@Field(() => ListStatus)
	status: ListStatus;

	@Field(() => Int)
	count: number;
}
