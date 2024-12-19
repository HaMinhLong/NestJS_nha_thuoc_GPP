// src/user-group.controller.ts
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
import { responseWrapper } from 'src/helper/response.helper';

import { UserGroupService } from './user-group.service';
import { UserGroup } from './entities/user-group.entity';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Controller('user-group')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  // Tạo mới nhóm người dùng
  @Post()
  @SetMetadata('customMessage', 'User group created successfully')
  async create(@Body() body: CreateUserGroupDto): Promise<UserGroup> {
    return this.userGroupService.create(body.name);
  }

  // Lấy tất cả nhóm người dùng
  @Get()
  @SetMetadata('customMessage', 'User groups list retrieved successfully')
  async findAll(): Promise<UserGroup[]> {
    return this.userGroupService.findAll();
  }

  // Lấy nhóm người dùng theo id
  @Get(':id')
  @SetMetadata('customMessage', 'User group details retrieved successfully')
  async findOne(@Param('id') id: number): Promise<UserGroup> {
    return this.userGroupService.findOne(id);
  }

  // Cập nhật nhóm người dùng
  @Put(':id')
  @SetMetadata('customMessage', 'User group updated successfully')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserGroupDto,
  ): Promise<UserGroup> {
    return this.userGroupService.update(id, body?.name || '');
  }

  // Xóa nhóm người dùng
  @Delete(':id')
  @SetMetadata('customMessage', 'User group deleted successfully')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userGroupService.remove(id);
  }
}
