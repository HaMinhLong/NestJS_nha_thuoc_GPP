import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { PermissionsGuard } from 'src/guard/permissions.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PaginationType } from 'src/types/global';

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('user_create')
  @SetMetadata('customMessage', 'User created successfully')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('user_getList')
  @SetMetadata('customMessage', 'User list retrieved successfully')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('keyword') keyword?: string,
    @Query('status') status?: number,
    @Query('userGroupId') userGroupId?: number,
    @Query('selectFields') selectFields?: (keyof User)[],
  ): Promise<{ data: User[]; pagination: PaginationType }> {
    return this.userService.findAll(
      page,
      limit,
      keyword,
      status,
      userGroupId,
      selectFields,
    );
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_getDetail')
  @SetMetadata('customMessage', 'User details retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_update')
  @SetMetadata('customMessage', 'User updated successfully')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('user_remove')
  @SetMetadata('customMessage', 'User deleted successfully')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
