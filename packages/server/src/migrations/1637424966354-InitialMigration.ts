import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1637424966354 implements MigrationInterface {
    name = 'InitialMigration1637424966354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isConfirmed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isConfirmed" DROP DEFAULT`);
    }

}
