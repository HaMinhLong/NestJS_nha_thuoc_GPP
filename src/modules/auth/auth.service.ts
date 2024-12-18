import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Đăng nhập sử dụng username hoặc email
  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Tìm user theo username hoặc email
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { email: username }],
    });

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Mật khẩu không đúng!');
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Hàm tạo user (kèm mã hóa mật khẩu)
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
}
