import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guard/permissions.guard';

import { CabinetService } from './cabinet.service';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

@Controller('cabinet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('cabinet_create')
  @SetMetadata('customMessage', 'Cabinet created successfully')
  create(@Body() createCabinetDto: CreateCabinetDto) {
    return this.cabinetService.create(createCabinetDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('cabinet_getList')
  @SetMetadata('customMessage', 'Cabinet list retrieved successfully')
  findAll() {
    return this.cabinetService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('cabinet_getDetail')
  @SetMetadata('customMessage', 'Cabinet details retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.cabinetService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('cabinet_update')
  @SetMetadata('customMessage', 'Cabinet updated successfully')
  update(@Param('id') id: string, @Body() updateCabinetDto: UpdateCabinetDto) {
    return this.cabinetService.update(+id, updateCabinetDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('cabinet_remove')
  @SetMetadata('customMessage', 'Cabinet deleted successfully')
  remove(@Param('id') id: string) {
    return this.cabinetService.remove(+id);
  }
}
