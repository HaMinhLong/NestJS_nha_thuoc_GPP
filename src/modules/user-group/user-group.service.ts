// src/user-group.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserGroup } from './entities/user-group.entity';
import { UserGroupPermission } from '../user-group-permission/entities/user-group-permission.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PaginationType } from 'src/types/global';

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
    // 1. Kiểm tra xem user group đã tồn tại hay chưa
    const existingUserGroup = await this.userGroupRepository.findOneBy({
      name,
    });

    if (existingUserGroup) {
      // Nếu đã tồn tại, throw một lỗi
      throw new ConflictException('User group đã tồn tại.');
    }

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
  async findAll(
    page = 1,
    limit = 10,
    keyword?: string,
    selectFields?: (keyof UserGroup)[],
  ): Promise<{
    data: UserGroup[];
    pagination: PaginationType;
  }> {
    // Tạo điều kiện where
    const whereCondition = keyword ? { name: Like(`%${keyword}%`) } : {};

    const skip = (page - 1) * limit;
    const take = limit;

    // Kiểm tra và xử lý `selectFields`
    const selectFieldsArray = Array.isArray(selectFields)
      ? selectFields
      : JSON.parse((selectFields || '[]') as string);
    const select = selectFieldsArray.length > 0 ? selectFieldsArray : undefined;

    // Lấy dữ liệu user groups với phân trang
    const [userGroups, total] = await this.userGroupRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      select,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: userGroups,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
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
      throw new NotFoundException('User group not found');
    }

    await this.userGroupPermissionRepository.delete({ userGroup: userGroup });

    await this.userGroupRepository.delete(id);
  }
}
