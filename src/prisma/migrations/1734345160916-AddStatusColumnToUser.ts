import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusColumnToUser1734345160916 implements MigrationInterface {
    name = 'AddStatusColumnToUser1734345160916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`status\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    }

}
