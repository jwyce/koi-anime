import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPreferences1637894315224 implements MigrationInterface {
    name = 'UserPreferences1637894315224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_theme_enum" AS ENUM('dark', 'light')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "theme" "public"."user_theme_enum" NOT NULL DEFAULT 'dark'`);
        await queryRunner.query(`CREATE TYPE "public"."user_profileicon_enum" AS ENUM('koi', 'dragon', 'dog', 'frog', 'fox', 'snake', 'rabbit', 'cat', 'monkey', 'seahorse', 'tiger', 'goat', 'rooster', 'pig', 'rat', 'turtle')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileIcon" "public"."user_profileicon_enum" NOT NULL DEFAULT 'koi'`);
        await queryRunner.query(`CREATE TYPE "public"."user_profilecolor_enum" AS ENUM('redorange', 'pink', 'teal', 'blue', 'salmon', 'purple')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileColor" "public"."user_profilecolor_enum" NOT NULL DEFAULT 'redorange'`);
        await queryRunner.query(`CREATE TYPE "public"."user_titlepreference_enum" AS ENUM('canonical', 'romanized', 'english', 'japanese')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "titlePreference" "public"."user_titlepreference_enum" NOT NULL DEFAULT 'canonical'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "showNSFW" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "showNSFW"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "titlePreference"`);
        await queryRunner.query(`DROP TYPE "public"."user_titlepreference_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileColor"`);
        await queryRunner.query(`DROP TYPE "public"."user_profilecolor_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileIcon"`);
        await queryRunner.query(`DROP TYPE "public"."user_profileicon_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "theme"`);
        await queryRunner.query(`DROP TYPE "public"."user_theme_enum"`);
    }

}
