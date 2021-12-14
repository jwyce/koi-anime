import { SongType } from '../helpers/enums';
import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Song extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column({ type: 'int' })
	animeID!: number;

	@Field(() => Int)
	@Column({ type: 'int' })
	animeAPIID!: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	artist: string;

	@Field()
	@Column()
	fullTitle: string;

	@Field()
	@Column()
	slug: string;

	@Field()
	@Column({ type: 'enum', enum: SongType, default: SongType.OP })
	songType: SongType;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
