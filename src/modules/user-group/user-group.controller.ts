import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Permissions } from 'src/decorators/permissions.decorator';

import { UserGroupService } from './user-group.service';
import { UserGroup } from './entities/user-group.entity';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { PermissionsGuard } from 'src/guard/permissions.guard';

@Controller('user-group')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  // Tạo mới nhóm người dùng
  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('user_group_create')
  @SetMetadata('customMessage', 'User group created successfully')
  async create(@Body() body: CreateUserGroupDto): Promise<UserGroup> {
    return this.userGroupService.create(body.name);
  }

  // Lấy tất cả nhóm người dùng
  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('user_group_getList')
  @SetMetadata('customMessage', 'User groups list retrieved successfully')
  async findAll(): Promise<UserGroup[]> {
    return this.userGroupService.findAll();
  }

  // Lấy nhóm người dùng theo id
  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_group_getDetail')
  @SetMetadata('customMessage', 'User group details retrieved successfully')
  async findOne(@Param('id') id: number): Promise<UserGroup> {
    return this.userGroupService.findOne(id);
  }

  // Cập nhật nhóm người dùng
  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_group_update')
  @SetMetadata('customMessage', 'User group updated successfully')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserGroupDto,
  ): Promise<UserGroup> {
    return this.userGroupService.update(id, body?.name || '');
  }

  // Xóa nhóm người dùng
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_group_remove')
  @SetMetadata('customMessage', 'User group deleted successfully')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userGroupService.remove(id);
  }
}
