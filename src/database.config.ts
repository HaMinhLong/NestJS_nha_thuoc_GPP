import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Naru+89-K-2',
  database: 'nha_thuoc',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
};
