import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    // Lấy tất cả các bản ghi `UserGroupPermission` liên quan đến các `id`
    const permissionIds = permissions.map((p) => p.id);
    const userGroupPermissions =
      await this.userGroupPermissionRepository.findBy({
        id: In(permissionIds),
      });

    // Tạo một map để tối ưu việc tra cứu
    const permissionMap = new Map(
      userGroupPermissions.map((perm) => [perm.id, perm]),
    );

    // Duyệt qua các permissions từ request và cập nhật
    for (const permissionData of permissions) {
      const userGroupPermission = permissionMap.get(permissionData.id);

      if (userGroupPermission) {
        // Cập nhật các quyền
        userGroupPermission.getList = permissionData.getList ?? false;
        userGroupPermission.getDetail = permissionData.getDetail ?? false;
        userGroupPermission.create = permissionData.create ?? false;
        userGroupPermission.update = permissionData.update ?? false;
        userGroupPermission.remove = permissionData.remove ?? false;
      }
    }
    console.log('per', [...permissionMap.values()]);
    // Lưu tất cả các thay đổi cùng lúc để giảm số lần ghi vào cơ sở dữ liệu
    await this.userGroupPermissionRepository.save([...permissionMap.values()]);

    return { message: 'User group permissions updated successfully' };
  }
}
