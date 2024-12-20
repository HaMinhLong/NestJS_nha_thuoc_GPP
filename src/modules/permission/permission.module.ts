import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';

import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, UserGroup, UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PermissionController],
  providers: [PermissionService, JwtStrategy],
  exports: [PermissionService],
})
export class PermissionModule {}
