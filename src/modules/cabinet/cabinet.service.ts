import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    return this.cabinetRepository.find();
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
