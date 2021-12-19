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
export class Character extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	//**   media id
	@Field(() => Int)
	@Column({ type: 'int', unique: true })
	malID!: number;

	@Field(() => Int)
	@Column({ type: 'int' })
	apiID!: number;

	@Field(() => Int)
	@Column({ type: 'int' })
	animeID!: number;

	@Field(() => Int)
	@Column({ type: 'int' })
	animeAPIID!: number;

	@Field()
	@Column()
	englishName: string;

	@Field()
	@Column()
	japaneseName: string;

	@Field()
	@Column()
	canonicalName: string;

	@Field()
	@Column()
	slug: string;

	@Field()
	@Column()
	gender: string;

	@Field()
	@Column()
	description: string;

	@Field()
	@Column()
	imageOriginal: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
