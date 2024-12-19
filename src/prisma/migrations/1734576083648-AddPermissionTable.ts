import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionTable1734576083648 implements MigrationInterface {
    name = 'AddPermissionTable1734576083648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_group_permissions\` (\`userGroupId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_e3fabdf263e622d464ff374cea\` (\`userGroupId\`), INDEX \`IDX_935dca4e591e09b1c0e21f9ab2\` (\`permissionId\`), PRIMARY KEY (\`userGroupId\`, \`permissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_group_permissions\` ADD CONSTRAINT \`FK_e3fabdf263e622d464ff374cea7\` FOREIGN KEY (\`userGroupId\`) REFERENCES \`user_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_group_permissions\` ADD CONSTRAINT \`FK_935dca4e591e09b1c0e21f9ab26\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_group_permissions\` DROP FOREIGN KEY \`FK_935dca4e591e09b1c0e21f9ab26\``);
        await queryRunner.query(`ALTER TABLE \`user_group_permissions\` DROP FOREIGN KEY \`FK_e3fabdf263e622d464ff374cea7\``);
        await queryRunner.query(`DROP INDEX \`IDX_935dca4e591e09b1c0e21f9ab2\` ON \`user_group_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3fabdf263e622d464ff374cea\` ON \`user_group_permissions\``);
        await queryRunner.query(`DROP TABLE \`user_group_permissions\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
