import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';
import { PermissionsGuard } from 'src/guard/permissions.guard';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

import { CabinetController } from './cabinet.controller';
import { Cabinet } from './entities/cabinet.entity';
import { CabinetService } from './cabinet.service';
import { UserGroupPermissionService } from '../user-group-permission/user-group-permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cabinet, UserGroupPermission]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CabinetController],
  providers: [
    CabinetService,
    JwtStrategy,
    PermissionsGuard,
    UserGroupPermissionService,
  ],
  exports: [CabinetService],
})
export class CabinetModule {}
