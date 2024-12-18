import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API Login
  @Post('login')
  async login(
    @Body('username') username: string, // Dùng username hoặc email
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(username, password);
  }

  // API Register (nếu cần)
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.authService.register(username, email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req: any) {
    return req.user; // Thông tin user từ token
  }
}
