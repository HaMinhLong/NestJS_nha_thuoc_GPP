import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';
import { databaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // Khởi tạo DataSource
        const dataSource = await databaseConfig.initialize();
        return {
          ...dataSource.options,
        };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
