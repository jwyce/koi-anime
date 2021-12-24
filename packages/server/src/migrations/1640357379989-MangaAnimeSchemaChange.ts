import {MigrationInterface, QueryRunner} from "typeorm";

export class MangaAnimeSchemaChange1640357379989 implements MigrationInterface {
    name = 'MangaAnimeSchemaChange1640357379989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anime" RENAME COLUMN "coverLinkSmall" TO "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "manga" RENAME COLUMN "coverLinkSmall" TO "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "anime" DROP COLUMN "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "anime" ADD "nextRelease" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "manga" DROP COLUMN "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "manga" ADD "nextRelease" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manga" DROP COLUMN "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "manga" ADD "nextRelease" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anime" DROP COLUMN "nextRelease"`);
        await queryRunner.query(`ALTER TABLE "anime" ADD "nextRelease" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "manga" RENAME COLUMN "nextRelease" TO "coverLinkSmall"`);
        await queryRunner.query(`ALTER TABLE "anime" RENAME COLUMN "nextRelease" TO "coverLinkSmall"`);
    }

}
