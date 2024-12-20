import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserGroupPermissions1734669901385 implements MigrationInterface {
    name = 'UpdateUserGroupPermissions1734669901385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_group_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`getList\` tinyint NOT NULL DEFAULT 0, \`getDetail\` tinyint NOT NULL DEFAULT 0, \`create\` tinyint NOT NULL DEFAULT 0, \`update\` tinyint NOT NULL DEFAULT 0, \`remove\` tinyint NOT NULL DEFAULT 0, \`userGroupId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_group_permission\` ADD CONSTRAINT \`FK_465ebd564a42a0250c580560586\` FOREIGN KEY (\`userGroupId\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_group_permission\` ADD CONSTRAINT \`FK_d6f515f9f0fb9bdc6d93f5129ef\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group_permission\` DROP FOREIGN KEY \`FK_d6f515f9f0fb9bdc6d93f5129ef\``);
        await queryRunner.query(`ALTER TABLE \`user_group_permission\` DROP FOREIGN KEY \`FK_465ebd564a42a0250c580560586\``);
        await queryRunner.query(`DROP TABLE \`user_group_permission\``);
    }

}
