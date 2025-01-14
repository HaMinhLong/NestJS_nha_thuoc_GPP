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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guard/permissions.guard';

import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Controller('product-type')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('product_type_create')
  @SetMetadata('customMessage', 'Product type created successfully')
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('product_type_getList')
  @SetMetadata('customMessage', 'Product type list retrieved successfully')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('keyword') keyword?: string,
    @Query('selectFields') selectFields?: (keyof ProductType)[],
  ) {
    return this.productTypeService.findAll(page, limit, keyword, selectFields);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('product_type_getDetail')
  @SetMetadata('customMessage', 'Product type details retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('product_type_update')
  @SetMetadata('customMessage', 'Product type updated successfully')
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('product_type_remove')
  @SetMetadata('customMessage', 'Product type deleted successfully')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
