import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';
import { PermissionsGuard } from 'src/guard/permissions.guard';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

import { ProductTypeController } from './product-type.controller';
import { ProductType } from './entities/product-type.entity';
import { ProductTypeService } from './product-type.service';
import { UserGroupPermissionService } from '../user-group-permission/user-group-permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductType, UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductTypeController],
  providers: [
    ProductTypeService,
    JwtStrategy,
    PermissionsGuard,
    UserGroupPermissionService,
  ],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
