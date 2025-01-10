import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateDatabase1736483881796 implements MigrationInterface {
    name = 'MigrateDatabase1736483881796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cabinet" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_6e1aaa59022d432d8cf3df7ef46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_group_permission" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_group_permission" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_group_permission" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_group_permission" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "cabinet"`);
    }

}
