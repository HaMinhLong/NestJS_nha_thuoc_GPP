import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserGroupPermissionService } from './user-group-permission.service';

@Controller('user-group-permissions')
export class UserGroupPermissionController {
  constructor(
    private readonly userGroupPermissionService: UserGroupPermissionService,
  ) {}

  @Get('user-group/:id')
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
