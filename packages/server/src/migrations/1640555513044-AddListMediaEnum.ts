import {MigrationInterface, QueryRunner} from "typeorm";

export class AddListMediaEnum1640555513044 implements MigrationInterface {
    name = 'AddListMediaEnum1640555513044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" RENAME COLUMN "resourceType" TO "mediaType"`);
        await queryRunner.query(`ALTER TYPE "public"."list_resourcetype_enum" RENAME TO "list_mediatype_enum"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME CONSTRAINT "PK_8637be38def6d13aabfd7bb7d27" TO "PK_47dc03b71f9d627112b25c02ed7"`);
        await queryRunner.query(`ALTER TYPE "public"."list_mediatype_enum" RENAME TO "list_mediatype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."list_mediatype_enum" AS ENUM('anime', 'manga')`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "mediaType" TYPE "public"."list_mediatype_enum" USING "mediaType"::"text"::"public"."list_mediatype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."list_mediatype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_mediatype_enum_old" AS ENUM('anime', 'manga', 'op_song', 'ed_song', 'm_character', 'f_character')`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "mediaType" TYPE "public"."list_mediatype_enum_old" USING "mediaType"::"text"::"public"."list_mediatype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."list_mediatype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."list_mediatype_enum_old" RENAME TO "list_mediatype_enum"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME CONSTRAINT "PK_47dc03b71f9d627112b25c02ed7" TO "PK_8637be38def6d13aabfd7bb7d27"`);
        await queryRunner.query(`ALTER TYPE "public"."list_mediatype_enum" RENAME TO "list_resourcetype_enum"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME COLUMN "mediaType" TO "resourceType"`);
    }

}
