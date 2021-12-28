import {MigrationInterface, QueryRunner} from "typeorm";

export class ListStatusEnumUpdate1640701196916 implements MigrationInterface {
    name = 'ListStatusEnumUpdate1640701196916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."list_status_enum" RENAME TO "list_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."list_status_enum" AS ENUM('planned', 'current', 'completed', 'on_hold', 'dropped')`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" TYPE "public"."list_status_enum" USING "status"::"text"::"public"."list_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."list_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_status_enum_old" AS ENUM('want_to_watch', 'watching', 'completed', 'on_hold', 'dropped')`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" TYPE "public"."list_status_enum_old" USING "status"::"text"::"public"."list_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "list" ALTER COLUMN "status" SET DEFAULT 'want_to_watch'`);
        await queryRunner.query(`DROP TYPE "public"."list_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."list_status_enum_old" RENAME TO "list_status_enum"`);
    }

}
