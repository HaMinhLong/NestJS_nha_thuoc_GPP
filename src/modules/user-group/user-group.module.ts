import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

import { UserGroupController } from './user-group.controller';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupService } from './user-group.service';
import { Permission } from '../permission/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroup, Permission, UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserGroupController],
  providers: [UserGroupService, JwtStrategy],
  exports: [UserGroupService],
})
export class UserGroupModule {}
