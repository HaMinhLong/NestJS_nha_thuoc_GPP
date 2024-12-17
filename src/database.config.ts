import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
};

export const databaseConfig = new DataSource({
  type: 'mysql',
  host: env.MYSQL_HOST || 'localhost',
  port: parseInt(env.DATABASE_PORT || '3306'),
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'prisma', 'migrations', '*.{ts,js}')],
});
