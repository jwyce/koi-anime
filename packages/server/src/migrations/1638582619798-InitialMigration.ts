import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1638582619798 implements MigrationInterface {
    name = 'InitialMigration1638582619798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."anime_subtype_enum" AS ENUM('ona', 'ova', 'tv', 'movie', 'special')`);
        await queryRunner.query(`CREATE TYPE "public"."anime_agerating_enum" AS ENUM('g', 'pg', 'r', 'r18')`);
        await queryRunner.query(`CREATE TYPE "public"."anime_status_enum" AS ENUM('current', 'finished', 'tba', 'unreleased', 'upcoming')`);
        await queryRunner.query(`CREATE TABLE "anime" ("id" SERIAL NOT NULL, "apiID" integer NOT NULL, "subtype" "public"."anime_subtype_enum" NOT NULL DEFAULT 'tv', "synopsis" character varying NOT NULL, "englishTitle" character varying NOT NULL, "romajiTitle" character varying NOT NULL, "japaneseTitle" character varying NOT NULL, "canonicalTitle" character varying NOT NULL, "slug" character varying NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "tba" character varying NOT NULL, "ageRating" "public"."anime_agerating_enum" NOT NULL DEFAULT 'g', "ageRatingGuide" character varying NOT NULL, "status" "public"."anime_status_enum" NOT NULL DEFAULT 'tba', "posterLinkOriginal" character varying NOT NULL, "posterLinkSmall" character varying NOT NULL, "coverLinkOriginal" character varying NOT NULL, "coverLinkSmall" character varying NOT NULL, "episodeCount" integer NOT NULL DEFAULT '0', "youtubeVideoId" character varying NOT NULL, "studios" character varying array NOT NULL, "nsfw" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f174055b2e02125e4524b9498c9" UNIQUE ("apiID"), CONSTRAINT "PK_6e567f73ed63fd388a7734cbdd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" SERIAL NOT NULL, "malID" integer NOT NULL, "apiID" integer NOT NULL, "animeID" integer NOT NULL, "animeAPIID" integer NOT NULL, "englishName" character varying NOT NULL, "japaneseName" character varying NOT NULL, "canonicalName" character varying NOT NULL, "slug" character varying NOT NULL, "gender" character varying NOT NULL, "description" character varying NOT NULL, "imageOriginal" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1b0deaf5fab4e19036b2c66c9eb" UNIQUE ("malID"), CONSTRAINT "UQ_96b249c5a4aef9394395419b471" UNIQUE ("apiID"), CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."list_resourcetype_enum" AS ENUM('anime', 'manga', 'op_song', 'ed_song', 'm_character', 'f_character')`);
        await queryRunner.query(`CREATE TYPE "public"."list_status_enum" AS ENUM('want_to_watch', 'watching', 'completed', 'on_hold', 'dropped')`);
        await queryRunner.query(`CREATE TABLE "list" ("userID" integer NOT NULL, "resourceID" integer NOT NULL, "resourceType" "public"."list_resourcetype_enum" NOT NULL, "currentEpisode" integer NOT NULL DEFAULT '0', "currentChapter" integer NOT NULL DEFAULT '0', "currentVolume" integer NOT NULL DEFAULT '0', "status" "public"."list_status_enum" NOT NULL DEFAULT 'want_to_watch', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e81d96253919a1bdc4e24c77b1" PRIMARY KEY ("userID", "resourceID", "resourceType"))`);
        await queryRunner.query(`CREATE TYPE "public"."manga_agerating_enum" AS ENUM('g', 'pg', 'r', 'r18')`);
        await queryRunner.query(`CREATE TYPE "public"."manga_subtype_enum" AS ENUM('doujin', 'manga', 'manhua', 'manhwa', 'novel', 'oel', 'oneshot')`);
        await queryRunner.query(`CREATE TYPE "public"."manga_status_enum" AS ENUM('current', 'finished', 'tba', 'unreleased', 'upcoming')`);
        await queryRunner.query(`CREATE TABLE "manga" ("id" SERIAL NOT NULL, "apiID" integer NOT NULL, "synopsis" character varying NOT NULL, "englishTitle" character varying NOT NULL, "romajiTitle" character varying NOT NULL, "japaneseTitle" character varying NOT NULL, "canonicalTitle" character varying NOT NULL, "slug" character varying NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "tba" character varying NOT NULL, "ageRating" "public"."manga_agerating_enum" NOT NULL DEFAULT 'g', "ageRatingGuide" character varying NOT NULL, "subtype" "public"."manga_subtype_enum" NOT NULL DEFAULT 'manga', "status" "public"."manga_status_enum" NOT NULL DEFAULT 'tba', "posterLinkOriginal" character varying NOT NULL, "posterLinkSmall" character varying NOT NULL, "coverLinkOriginal" character varying NOT NULL, "coverLinkSmall" character varying NOT NULL, "chapterCount" integer NOT NULL DEFAULT '0', "volumeCount" integer NOT NULL DEFAULT '0', "serialization" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d82d82e4c2b282772e9764af001" UNIQUE ("apiID"), CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ranking_resourcetype_enum" AS ENUM('anime', 'manga', 'op_song', 'ed_song', 'm_character', 'f_character')`);
        await queryRunner.query(`CREATE TABLE "ranking" ("userID" integer NOT NULL, "votedResourceID" integer NOT NULL, "resourceType" "public"."ranking_resourcetype_enum" NOT NULL, "matchupKey" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b9b9c903a4993a67e21e88ba276" UNIQUE ("matchupKey"), CONSTRAINT "PK_8f43a65784f2abbd2abedc958cf" PRIMARY KEY ("userID", "votedResourceID", "resourceType"))`);
        await queryRunner.query(`CREATE TYPE "public"."song_songtype_enum" AS ENUM('op', 'ed')`);
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "apiID" integer NOT NULL, "animeID" integer NOT NULL, "animeAPIID" integer NOT NULL, "name" character varying NOT NULL, "artist" character varying NOT NULL, "fullTitle" character varying NOT NULL, "slug" character varying NOT NULL, "songType" "public"."song_songtype_enum" NOT NULL DEFAULT 'op', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7cf44c5b32662cab57652815605" UNIQUE ("apiID"), CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_profileicon_enum" AS ENUM('koi', 'dragon', 'dog', 'frog', 'fox', 'snake', 'rabbit', 'cat', 'monkey', 'seahorse', 'tiger', 'goat', 'rooster', 'pig', 'rat', 'turtle')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profilecolor_enum" AS ENUM('redorange', 'pink', 'teal', 'blue', 'salmon', 'purple')`);
        await queryRunner.query(`CREATE TYPE "public"."user_titlepreference_enum" AS ENUM('canonical', 'romanized', 'english', 'japanese')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileIcon" "public"."user_profileicon_enum" NOT NULL DEFAULT 'koi', "profileColor" "public"."user_profilecolor_enum" NOT NULL DEFAULT 'redorange', "titlePreference" "public"."user_titlepreference_enum" NOT NULL DEFAULT 'canonical', "showNSFW" boolean NOT NULL DEFAULT false, "isConfirmed" boolean NOT NULL DEFAULT false, "failedAttempts" integer NOT NULL DEFAULT '0', "lockoutEnd" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_titlepreference_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profilecolor_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profileicon_enum"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`DROP TYPE "public"."song_songtype_enum"`);
        await queryRunner.query(`DROP TABLE "ranking"`);
        await queryRunner.query(`DROP TYPE "public"."ranking_resourcetype_enum"`);
        await queryRunner.query(`DROP TABLE "manga"`);
        await queryRunner.query(`DROP TYPE "public"."manga_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."manga_subtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."manga_agerating_enum"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TYPE "public"."list_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."list_resourcetype_enum"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "anime"`);
        await queryRunner.query(`DROP TYPE "public"."anime_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."anime_agerating_enum"`);
        await queryRunner.query(`DROP TYPE "public"."anime_subtype_enum"`);
    }

}
