import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';
import { Cabinet } from './entities/cabinet.entity';

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(Cabinet)
    private readonly cabinetRepository: Repository<Cabinet>,
  ) {}

  create(createCabinetDto: CreateCabinetDto) {
    const cabinet = this.cabinetRepository.create(createCabinetDto);
    return this.cabinetRepository.save(cabinet);
  }

  async findAll(
    page = 1,
    limit = 10,
    keyword?: string,
    selectFields?: (keyof Cabinet)[],
  ) {
    // Tạo điều kiện where
    const whereCondition = [];

    if (keyword) {
      whereCondition.push(
        { name: Like(`%${keyword}%`) },
        { code: Like(`%${keyword}%`) },
      );
    }

    const skip = (page - 1) * limit;
    const take = limit;

    // Kiểm tra và xử lý `selectFields`
    const selectFieldsArray = Array.isArray(selectFields)
      ? selectFields
      : JSON.parse((selectFields || '[]') as string);
    const select = selectFieldsArray.length > 0 ? selectFieldsArray : undefined;

    // Lấy dữ liệu user groups với phân trang
    const [cabinets, total] = await this.cabinetRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      select,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: cabinets,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  findOne(id: number) {
    return this.cabinetRepository.findOne({ where: { id } });
  }

  update(id: number, updateCabinetDto: UpdateCabinetDto) {
    return this.cabinetRepository.update(id, updateCabinetDto);
  }

  remove(id: number) {
    return this.cabinetRepository.delete(id);
  }
}
