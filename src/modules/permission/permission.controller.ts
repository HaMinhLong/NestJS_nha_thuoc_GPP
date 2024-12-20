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

import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Permissions } from 'src/decorators/permissions.decorator';

import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsGuard } from 'src/guard/permissions.guard';

@Controller('permission')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // Tạo mới quyền
  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('permission_create')
  @SetMetadata('customMessage', 'Permission created successfully')
  async create(@Body() body: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(body.name);
  }

  // Lấy tất cả quyền
  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('permission_getList')
  @SetMetadata('customMessage', 'Permissions list retrieved successfully')
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  // Lấy quyền theo id
  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('permission_getDetail')
  @SetMetadata('customMessage', 'Permission details retrieved successfully')
  async findOne(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  // Cập nhật quyền
  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('permission_update')
  @SetMetadata('customMessage', 'Permission updated successfully')
  async update(
    @Param('id') id: number,
    @Body() body: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, body?.name || '');
  }

  // Xóa quyền
  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('permission_remove')
  @SetMetadata('customMessage', 'Permission deleted successfully')
  async remove(@Param('id') id: number): Promise<void> {
    return this.permissionService.remove(id);
  }
}
