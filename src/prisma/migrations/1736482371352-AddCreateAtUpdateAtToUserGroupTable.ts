import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateAtUpdateAtToUserGroupTable1736482371352 implements MigrationInterface {
    name = 'AddCreateAtUpdateAtToUserGroupTable1736482371352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_group\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_group\` DROP COLUMN \`createdAt\``);
    }

}
