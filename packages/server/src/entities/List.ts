import { ListStatus, ResourceType } from '../helpers/enums';
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
export class List extends BaseEntity {
	@Field(() => Int)
	@PrimaryColumn()
	userID: number;

	@Field(() => Int)
	@PrimaryColumn()
	resourceID: number;

	@Field(() => ResourceType)
	@PrimaryColumn({ type: 'enum', enum: ResourceType })
	resourceType: ResourceType;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	currentEpisode: number;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	currentChapter: number;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	currentVolume: number;

	@Field(() => ListStatus)
	@Column({ type: 'enum', enum: ListStatus, default: ListStatus.WANT_TO_WATCH })
	status: ListStatus;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
