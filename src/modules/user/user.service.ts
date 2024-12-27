import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { PaginationType } from 'src/types/global';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      status: createUserDto.status ?? 1,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(
    page = 1,
    limit = 10,
    keyword?: string,
    status?: number,
    userGroupId?: number,
    selectFields?: (keyof User)[],
  ): Promise<{ data: User[]; pagination: PaginationType }> {
    // Tạo điều kiện where
    const whereCondition = [];
    if (keyword) {
      whereCondition.push(
        { name: Like(`%${keyword}%`) },
        { phone: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
      );
    }

    if (status) {
      whereCondition.push({ status });
    }

    if (userGroupId) {
      whereCondition.push({ userGroupId });
    }

    const skip = (page - 1) * limit;
    const take = limit;

    // Kiểm tra và xử lý `selectFields`
    const selectFieldsArray = Array.isArray(selectFields)
      ? selectFields
      : JSON.parse((selectFields || '[]') as string);
    const select = selectFieldsArray.length > 0 ? selectFieldsArray : undefined;

    // Lấy dữ liệu user groups với phân trang
    const [users, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      skip,
      take,
      select,
      relations: ['userGroup'],
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // Mã hóa nếu cập nhật password
    }

    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Trả về user nếu mật khẩu đúng
    }
    return null;
  }
}
