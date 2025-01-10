import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
};

export const databaseConfig = new DataSource({
  type: 'mysql',
  host: env.DB_HOST || 'mysql',
  port: parseInt(env.DB_PORT || '3306'),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'prisma/migrations/*.{ts,js}')],
});
