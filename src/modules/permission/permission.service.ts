import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(name: string): Promise<Permission> {
    const newPermission = this.permissionRepository.create({ name });
    return this.permissionRepository.save(newPermission);
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
    await this.permissionRepository.delete(id);
  }
}
