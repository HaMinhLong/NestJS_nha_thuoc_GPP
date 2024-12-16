import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserGroupAndUserRelationship1734346442200 implements MigrationInterface {
    name = 'CreateUserGroupAndUserRelationship1734346442200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`userGroups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`user_group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e23638536c6a49d7762dabbeab2\` FOREIGN KEY (\`user_group_id\`) REFERENCES \`userGroups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e23638536c6a49d7762dabbeab2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_group_id\``);
        await queryRunner.query(`DROP TABLE \`userGroups\``);
    }

}
