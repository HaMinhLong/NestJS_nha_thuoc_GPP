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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { PermissionsGuard } from 'src/guard/permissions.guard';

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @SetMetadata('customMessage', 'User created successfully')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @SetMetadata('permission', 'user.getList')
  @UseGuards(PermissionsGuard)
  @SetMetadata('customMessage', 'User list retrieved successfully')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @SetMetadata('customMessage', 'User details retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @SetMetadata('customMessage', 'User updated successfully')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata('customMessage', 'User deleted successfully')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
