import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  create(createProductTypeDto: CreateProductTypeDto) {
    const productType = this.productTypeRepository.create(createProductTypeDto);
    return this.productTypeRepository.save(productType);
  }

  async findAll(
    page = 1,
    limit = 10,
    keyword?: string,
    selectFields?: (keyof ProductType)[],
  ) {
    // Tạo điều kiện where
    const whereCondition = [];

    if (keyword) {
      whereCondition.push({ name: Like(`%${keyword}%`) });
    }

    const skip = (page - 1) * limit;
    const take = limit;

    // Kiểm tra và xử lý `selectFields`
    const selectFieldsArray = Array.isArray(selectFields)
      ? selectFields
      : JSON.parse((selectFields || '[]') as string);
    const select = selectFieldsArray.length > 0 ? selectFieldsArray : undefined;

    // Lấy dữ liệu user groups với phân trang
    const [productTypes, total] = await this.productTypeRepository.findAndCount(
      {
        where: whereCondition,
        skip,
        take,
        select,
      },
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: productTypes,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  findOne(id: number) {
    return this.productTypeRepository.findOne({ where: { id } });
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeRepository.update(id, updateProductTypeDto);
  }

  remove(id: number) {
    return this.productTypeRepository.delete(id);
  }
}
