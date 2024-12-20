import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserGroupPermissionService } from './user-group-permission.service';
import { PermissionsGuard } from 'src/guard/permissions.guard';
import { Permissions } from 'src/decorators/permissions.decorator';

@Controller('user-group-permissions')
export class UserGroupPermissionController {
  constructor(
    private readonly userGroupPermissionService: UserGroupPermissionService,
  ) {}

  @Get('user-group/:id')
  @UseGuards(PermissionsGuard)
  @Permissions('permission_getList')
  @SetMetadata(
    'customMessage',
    'User group permissions list retrieved successfully',
  )
  async getPermissionsByUserGroup(@Param('id') id: string) {
    const userGroupId = parseInt(id, 10);
    if (isNaN(userGroupId)) {
      throw new Error('Invalid user group ID');
    }

    return this.userGroupPermissionService.getPermissionsByUserGroup(
      userGroupId,
    );
  }

  @Put()
  @UseGuards(PermissionsGuard)
  @Permissions('permission_update')
  @SetMetadata('customMessage', 'User group permissions updated successfully')
  async updatePermissions(
    @Body()
    permissions: {
      id: number;
      getList?: boolean;
      getDetail?: boolean;
      create?: boolean;
      update?: boolean;
      remove?: boolean;
    }[],
  ) {
    return this.userGroupPermissionService.updatePermissions(permissions);
  }
}
