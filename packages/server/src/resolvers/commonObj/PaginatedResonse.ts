import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export const PaginatedResponse = <TItem>(TItemClass: ClassType<TItem>) => {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	// @ObjectType({ isAbstract: true })
	// instead of `isAbstract`, we have to provide a unique type name used in schema
	@ObjectType(`Paginated${TItemClass.name}Response`)
	abstract class PaginatedResponseClass {
		// here we use the runtime argument
		@Field(() => [TItemClass])
		// and here the generic type
		items: TItem[];

		@Field(() => Int)
		nextCursor: number;

		@Field()
		hasMore: boolean;
	}
	return PaginatedResponseClass;
};
