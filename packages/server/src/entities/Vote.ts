import { ResourceType } from '../helpers/enums';
import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Field(() => Int)
	@PrimaryColumn()
	userID: number;

	@Field(() => String)
	@PrimaryColumn()
	votedFor: string;

	@Field(() => String)
	@PrimaryColumn()
	votedAgainst: string;

	@Field(() => ResourceType)
	@PrimaryColumn({ type: 'enum', enum: ResourceType })
	resourceType: ResourceType;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
