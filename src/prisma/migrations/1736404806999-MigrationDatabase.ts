import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationDatabase1736404806999 implements MigrationInterface {
  name = 'MigrationDatabase1736404806999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userGroupId\` int NOT NULL, INDEX \`idx_user_group_id\` (\`userGroupId\`), UNIQUE INDEX \`idx_user_email\` (\`email\`), UNIQUE INDEX \`idx_user_username\` (\`username\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_group_permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`getList\` tinyint NOT NULL DEFAULT 0, \`getDetail\` tinyint NOT NULL DEFAULT 0, \`create\` tinyint NOT NULL DEFAULT 0, \`update\` tinyint NOT NULL DEFAULT 0, \`remove\` tinyint NOT NULL DEFAULT 0, \`userGroupId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_2b7a243184e4f1a8b7451c09eb1\` FOREIGN KEY (\`userGroupId\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_group_permission\` ADD CONSTRAINT \`FK_465ebd564a42a0250c580560586\` FOREIGN KEY (\`userGroupId\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_group_permission\` ADD CONSTRAINT \`FK_d6f515f9f0fb9bdc6d93f5129ef\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_group_permission\` DROP FOREIGN KEY \`FK_d6f515f9f0fb9bdc6d93f5129ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_group_permission\` DROP FOREIGN KEY \`FK_465ebd564a42a0250c580560586\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_2b7a243184e4f1a8b7451c09eb1\``,
    );
    await queryRunner.query(`DROP TABLE \`user_group\``);
    await queryRunner.query(`DROP TABLE \`user_group_permission\``);
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP INDEX \`idx_user_username\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_user_email\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`idx_user_group_id\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
