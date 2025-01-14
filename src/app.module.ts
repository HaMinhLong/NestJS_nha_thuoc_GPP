import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './config/configuration';
import { databaseConfig } from './database.config';
import { ResponseInterceptor } from './interceptors/response.interceptor';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserGroupModule } from './modules/user-group/user-group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { UserGroupPermissionModule } from './modules/user-group-permission/user-group-permission.module';
import { CabinetModule } from './modules/cabinet/cabinet.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';

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
    AuthModule,
    PermissionModule,
    UserGroupPermissionModule,
    CabinetModule,
    ProductTypeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
