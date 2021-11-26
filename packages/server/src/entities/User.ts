import {
	ProfileColor,
	ProfileIcon,
	ThemePreference,
	TitlePreference,
} from '../helpers/enums';
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
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field(() => ThemePreference)
	@Column({
		type: 'enum',
		enum: ThemePreference,
		default: ThemePreference.DARK,
	})
	theme: ThemePreference;

	@Field(() => ProfileIcon)
	@Column({
		type: 'enum',
		enum: ProfileIcon,
		default: ProfileIcon.KOI,
	})
	profileIcon: ProfileIcon;

	@Field(() => ProfileColor)
	@Column({
		type: 'enum',
		enum: ProfileColor,
		default: ProfileColor.REDORANGE,
	})
	profileColor: ProfileColor;

	@Field(() => TitlePreference)
	@Column({
		type: 'enum',
		enum: TitlePreference,
		default: TitlePreference.CANONICAL,
	})
	titlePreference: TitlePreference;

	@Field()
	@Column({ default: false })
	showNSFW: boolean;

	@Field()
	@Column({ default: false })
	isConfirmed: boolean;

	@Column({ type: 'int', default: 0 })
	failedAttempts: number;

	@Field()
	@Column({ nullable: true })
	lockoutEnd?: Date;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
