import { Field, InputType, Int } from 'type-graphql';
import { ListStatus, Media } from '../../helpers/enums';

@InputType()
export class UpdateListInput {
	@Field()
	slug: string;

	@Field(() => Media)
	type: Media;

	@Field(() => ListStatus, { nullable: true })
	status: ListStatus;

	@Field(() => Int, { nullable: true })
	episodeCount: number;

	@Field(() => Int, { nullable: true })
	chapterCount: number;
}
