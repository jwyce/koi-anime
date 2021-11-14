import { ResourceType } from '../helpers/enums';
import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Ranking extends BaseEntity {
	@Field(() => Int)
	@PrimaryColumn()
	userID: number;

	@Field(() => Int)
	@PrimaryColumn()
	votedResourceID: number;

	@Field(() => ResourceType)
	@PrimaryColumn({ type: 'enum', enum: ResourceType })
	resourceType: ResourceType;

	@Field()
	@Column({ unique: true })
	matchupKey: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
