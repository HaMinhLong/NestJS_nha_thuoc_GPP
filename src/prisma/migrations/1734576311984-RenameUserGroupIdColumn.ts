import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserGroupIdColumn1734576311984 implements MigrationInterface {
    name = 'RenameUserGroupIdColumn1734576311984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e23638536c6a49d7762dabbeab2\``);
        await queryRunner.query(`DROP INDEX \`idx_user_group_id\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`user_group_id\` \`userGroupId\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`idx_user_group_id\` ON \`user\` (\`userGroupId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_2b7a243184e4f1a8b7451c09eb1\` FOREIGN KEY (\`userGroupId\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_2b7a243184e4f1a8b7451c09eb1\``);
        await queryRunner.query(`DROP INDEX \`idx_user_group_id\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userGroupId\` \`user_group_id\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`idx_user_group_id\` ON \`user\` (\`user_group_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e23638536c6a49d7762dabbeab2\` FOREIGN KEY (\`user_group_id\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
