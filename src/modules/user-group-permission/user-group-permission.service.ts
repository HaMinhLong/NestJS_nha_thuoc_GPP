import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupPermission } from './entities/user-group-permission.entity';

@Injectable()
export class UserGroupPermissionService {
  constructor(
    @InjectRepository(UserGroupPermission)
    private readonly userGroupPermissionRepository: Repository<UserGroupPermission>,
  ) {}

  async getPermissionsByUserGroup(userGroupId: number) {
    const result = await this.userGroupPermissionRepository.find({
      where: { userGroup: { id: userGroupId } }, // Sử dụng `userGroup.id` thay vì `userGroupId`
      relations: ['permission'],
    });

    return result;
  }

  async updatePermissions(
    permissions: {
      id: number;
      getList?: boolean;
      getDetail?: boolean;
      create?: boolean;
      update?: boolean;
      remove?: boolean;
    }[],
  ) {
    // Lấy tất cả các bản ghi `UserGroupPermission` của `userGroupId`

    // Duyệt qua các permission và cập nhật tương ứng
    for (const permissionData of permissions) {
      const userGroupPermission =
        await this.userGroupPermissionRepository.findOne({
          where: { id: permissionData.id },
        });

      if (userGroupPermission) {
        // Cập nhật các quyền nếu tìm thấy bản ghi
        userGroupPermission.getList =
          permissionData.getList ?? userGroupPermission.getList;
        userGroupPermission.getDetail =
          permissionData.getDetail ?? userGroupPermission.getDetail;
        userGroupPermission.create =
          permissionData.create ?? userGroupPermission.create;
        userGroupPermission.update =
          permissionData.update ?? userGroupPermission.update;
        userGroupPermission.remove =
          permissionData.remove ?? userGroupPermission.remove;

        await this.userGroupPermissionRepository.save(userGroupPermission);
      }
    }

    return { message: 'User group permissions updated successfully' };
  }
}
