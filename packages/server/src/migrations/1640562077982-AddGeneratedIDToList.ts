import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGeneratedIDToList1640562077982 implements MigrationInterface {
    name = 'AddGeneratedIDToList1640562077982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_47dc03b71f9d627112b25c02ed7"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_16c167dc3291635afcff0e18c4f" PRIMARY KEY ("userID", "mediaType", "resourceSlug", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "PK_16c167dc3291635afcff0e18c4f"`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "PK_47dc03b71f9d627112b25c02ed7" PRIMARY KEY ("userID", "mediaType", "resourceSlug")`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "id"`);
    }

}
