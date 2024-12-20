import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { UserGroup } from '../user-group/entities/user-group.entity';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,

    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,

    @InjectRepository(UserGroupPermission)
    private userGroupPermissionRepository: Repository<UserGroupPermission>,
  ) {}

  async create(name: string): Promise<Permission> {
    // 1. Tạo Permission mới
    const newPermission = this.permissionRepository.create({ name });
    const savedPermission = await this.permissionRepository.save(newPermission);

    // 2. Lấy danh sách tất cả User Groups
    const userGroups = await this.userGroupRepository.find();

    // 3. Tạo bản ghi trong bảng user_group_permissions
    const userGroupPermissions = userGroups.map((group) =>
      this.userGroupPermissionRepository.create({
        userGroup: group,
        permission: savedPermission,
        getList: false,
        getDetail: false,
        create: false,
        update: false,
        remove: false,
      }),
    );

    await this.userGroupPermissionRepository.save(userGroupPermissions);

    return savedPermission;
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: number): Promise<Permission> {
    const userGroup = await this.permissionRepository.findOneBy({ id });

    if (!userGroup) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    return userGroup;
  }

  async update(id: number, name: string): Promise<Permission> {
    const userGroup = await this.findOne(id);
    Object.assign(userGroup, { name });

    return this.permissionRepository.save(userGroup);
  }

  // Xóa nhóm người dùng
  async remove(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permission) {
      throw new Error('Permission not found');
    }

    // Xóa các bản ghi trong bảng user_group_permissions với permissionId
    await this.userGroupPermissionRepository.delete({ permission: permission });

    // Xóa bản ghi trong bảng permission
    await this.permissionRepository.delete(id);
  }
}
