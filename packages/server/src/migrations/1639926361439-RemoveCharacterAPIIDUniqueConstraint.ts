import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCharacterAPIIDUniqueConstraint1639926361439 implements MigrationInterface {
    name = 'RemoveCharacterAPIIDUniqueConstraint1639926361439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "UQ_96b249c5a4aef9394395419b471"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "UQ_96b249c5a4aef9394395419b471" UNIQUE ("apiID")`);
    }

}
