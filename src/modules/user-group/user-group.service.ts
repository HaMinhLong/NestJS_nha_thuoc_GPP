// src/user-group.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,

    @InjectRepository(UserGroupPermission)
    private userGroupPermissionRepository: Repository<UserGroupPermission>,

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  // Tạo mới nhóm người dùng
  async create(name: string): Promise<UserGroup> {
    // 1. Tạo user group mới
    const newUserGroup = this.userGroupRepository.create({ name });
    const savedUserGroup = await this.userGroupRepository.save(newUserGroup);

    // 2. Lấy danh sách tất cả permission
    const permissions = await this.permissionRepository.find();

    // 3. Tạo bản ghi trong bảng user_group_permissions
    const userGroupPermissions = permissions.map((permission) =>
      this.userGroupPermissionRepository.create({
        userGroup: savedUserGroup,
        permission: permission,
        getList: false,
        getDetail: false,
        create: false,
        update: false,
        remove: false,
      }),
    );

    await this.userGroupPermissionRepository.save(userGroupPermissions);

    return savedUserGroup;
  }

  // Lấy tất cả nhóm người dùng
  async findAll(): Promise<UserGroup[]> {
    return this.userGroupRepository.find({
      relations: ['users'],
      select: {
        users: {
          id: true,
          name: true,
        },
      },
    });
  }

  // Lấy nhóm người dùng theo id
  async findOne(id: number): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOneBy({ id });

    if (!userGroup) {
      throw new NotFoundException(`User group with id ${id} not found`);
    }

    return userGroup;
  }

  // Cập nhật nhóm người dùng
  async update(id: number, name: string): Promise<UserGroup> {
    const userGroup = await this.findOne(id);
    Object.assign(userGroup, { name });

    return this.userGroupRepository.save(userGroup);
  }

  // Xóa nhóm người dùng
  async remove(id: number): Promise<void> {
    const userGroup = await this.userGroupRepository.findOne({
      where: { id },
    });

    if (!userGroup) {
      throw new Error('user group not found');
    }

    await this.userGroupPermissionRepository.delete({ userGroup: userGroup });

    await this.userGroupRepository.delete(id);
  }
}
