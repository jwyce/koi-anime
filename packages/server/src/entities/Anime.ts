import { AgeRating, AnimeSubtype, Status } from '../helpers/enums';
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
export class Anime extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column({ type: 'int', unique: true })
	apiID!: number;

	@Field(() => AnimeSubtype)
	@Column({ type: 'enum', enum: AnimeSubtype, default: AnimeSubtype.TV })
	subtype: AnimeSubtype;

	@Field()
	@Column()
	synopsis: string;

	@Field()
	@Column()
	englishTitle: string;

	@Field()
	@Column()
	romajiTitle: string;

	@Field()
	@Column()
	japaneseTitle: string;

	@Field()
	@Column()
	canonicalTitle: string;

	@Field()
	@Column()
	slug: string;

	@Field(() => Date)
	@Column({ nullable: true })
	startDate?: Date;

	@Field(() => Date)
	@Column({ nullable: true })
	endDate?: Date;

	@Field()
	@Column()
	tba: string;

	@Field(() => AgeRating)
	@Column({ type: 'enum', enum: AgeRating, default: AgeRating.G })
	ageRating: AgeRating;

	@Field()
	@Column()
	ageRatingGuide: string;

	@Field(() => Status)
	@Column({ type: 'enum', enum: Status, default: Status.TBA })
	status: Status;

	@Field()
	@Column()
	posterLinkOriginal: string;

	@Field()
	@Column()
	posterLinkSmall: string;

	@Field()
	@Column()
	coverLinkOriginal: string;

	@Field()
	@Column()
	coverLinkSmall: string;

	@Field(() => Int)
	@Column({ default: 0 })
	episodeCount: number;

	@Field()
	@Column()
	youtubeVideoId: string;

	@Field(() => [String])
	@Column('varchar', { array: true })
	studios: string[];

	@Field()
	@Column()
	nsfw: boolean;

	@Field(() => String)
	@CreateDateColumn()
	createdAt = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
