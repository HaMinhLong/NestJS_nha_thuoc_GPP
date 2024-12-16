import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { databaseConfig } from './database.config';
import { UserModule } from './modules/user/user.module';
import { UserGroupModule } from './modules/user-group/user-group.module';

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
    UserGroupModule,
  ],
})
export class AppModule {}
