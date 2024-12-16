import { join } from 'path';
import { DataSource } from 'typeorm';

export const databaseConfig = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Naru+89-K-2',
  database: 'nha_thuoc',
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'prisma', 'migrations', '*.{ts,js}')], // Đúng đường dẫn
});
