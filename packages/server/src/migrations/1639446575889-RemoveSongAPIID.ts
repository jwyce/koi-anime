import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveSongAPIID1639446575889 implements MigrationInterface {
    name = 'RemoveSongAPIID1639446575889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "UQ_7cf44c5b32662cab57652815605"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "apiID"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD "apiID" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "UQ_7cf44c5b32662cab57652815605" UNIQUE ("apiID")`);
    }

}
