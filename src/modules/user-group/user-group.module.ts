import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';

import { UserGroupController } from './user-group.controller';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupService } from './user-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroup]),
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
