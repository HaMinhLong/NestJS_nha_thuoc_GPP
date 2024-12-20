import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';

import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
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
