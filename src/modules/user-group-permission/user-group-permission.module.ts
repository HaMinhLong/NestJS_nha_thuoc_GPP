import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';

import { UserGroupPermissionController } from './user-group-permission.controller';
import { UserGroupPermission } from './entities/user-group-permission.entity';
import { UserGroupPermissionService } from './user-group-permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserGroupPermissionController],
  providers: [UserGroupPermissionService, JwtStrategy],
  exports: [UserGroupPermissionService],
})
export class UserGroupPermissionModule {}
