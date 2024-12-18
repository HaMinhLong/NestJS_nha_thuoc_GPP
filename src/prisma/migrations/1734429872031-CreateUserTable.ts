import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1734429872031 implements MigrationInterface {
  name = 'CreateUserTable1734429872031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_group_id\` int NOT NULL, INDEX \`idx_user_group_id\` (\`user_group_id\`), UNIQUE INDEX \`idx_user_email\` (\`email\`), UNIQUE INDEX \`idx_user_username\` (\`username\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e23638536c6a49d7762dabbeab2\` FOREIGN KEY (\`user_group_id\`) REFERENCES \`user_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e23638536c6a49d7762dabbeab2\``,
    );
    await queryRunner.query(`DROP TABLE \`user_group\``);
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
