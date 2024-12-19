// src/user-group.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroup } from './entities/user-group.entity';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,
  ) {}

  // Tạo mới nhóm người dùng
  async create(name: string): Promise<UserGroup> {
    const newUserGroup = this.userGroupRepository.create({ name });
    return this.userGroupRepository.save(newUserGroup);
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
    await this.userGroupRepository.delete(id);
  }
}
