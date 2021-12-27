import {MigrationInterface, QueryRunner} from "typeorm";

export class ListAndVoteSchemaChange1640548231860 implements MigrationInterface {
    name = 'ListAndVoteSchemaChange1640548231860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" RENAME COLUMN "resourceID" TO "resourceSlug"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME CONSTRAINT "PK_0e81d96253919a1bdc4e24c77b1" TO "PK_8637be38def6d13aabfd7bb7d27"`);
        await queryRunner.query(`CREATE TYPE "public"."vote_resourcetype_enum" AS ENUM('anime', 'manga', 'op_song', 'ed_song', 'm_character', 'f_character')`);
        await queryRunner.query(`CREATE TABLE "vote" ("userID" integer NOT NULL, "votedFor" character varying NOT NULL, "votedAgainst" character varying NOT NULL, "resourceType" "public"."vote_resourcetype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a76a6815c7d51f444549ce74fb0" PRIMARY KEY ("userID", "votedFor", "votedAgainst", "resourceType"))`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_795de8246c650e2416412989726" PRIMARY KEY ("userID", "resourceType")`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "resourceSlug"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "resourceSlug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_795de8246c650e2416412989726"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27" PRIMARY KEY ("userID", "resourceType", "resourceSlug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_795de8246c650e2416412989726" PRIMARY KEY ("userID", "resourceType")`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "resourceSlug"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "resourceSlug" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_795de8246c650e2416412989726"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27" PRIMARY KEY ("userID", "resourceSlug", "resourceType")`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TYPE "public"."vote_resourcetype_enum"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27" TO "PK_0e81d96253919a1bdc4e24c77b1"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME COLUMN "resourceSlug" TO "resourceID"`);
    }

}
