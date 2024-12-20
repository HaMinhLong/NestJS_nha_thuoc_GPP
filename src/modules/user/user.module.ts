import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';

import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { PermissionsGuard } from 'src/guard/permissions.guard';
import { UserGroupPermissionService } from '../user-group-permission/user-group-permission.service';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    PermissionsGuard,
    UserGroupPermissionService,
  ],
  exports: [UserService],
})
export class UserModule {}
