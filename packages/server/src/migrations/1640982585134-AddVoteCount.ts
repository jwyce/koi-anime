import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVoteCount1640982585134 implements MigrationInterface {
    name = 'AddVoteCount1640982585134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" SET DEFAULT 'planned'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "count"`);
    }

}
