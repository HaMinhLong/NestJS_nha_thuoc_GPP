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
} from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroup } from './entities/user-group.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user-group')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  // Tạo mới nhóm người dùng
  @Post()
  async create(@Body() body: { name: string }): Promise<UserGroup> {
    return this.userGroupService.create(body.name);
  }

  // Lấy tất cả nhóm người dùng
  @Get()
  async findAll(): Promise<UserGroup[]> {
    return this.userGroupService.findAll();
  }

  // Lấy nhóm người dùng theo id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserGroup> {
    return this.userGroupService.findOne(id);
  }

  // Cập nhật nhóm người dùng
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<UserGroup> {
    return this.userGroupService.update(id, body.name);
  }

  // Xóa nhóm người dùng
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userGroupService.remove(id);
  }
}
