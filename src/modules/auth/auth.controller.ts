import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API Login
  @Post('login')
  @SetMetadata('customMessage', 'Login successfully')
  async login(
    @Body('username') username: string, // Dùng username hoặc email
    @Body('password') password: string,
  ): Promise<{ accessToken: string; permission: string[] }> {
    return this.authService.login(username, password);
  }

  // API Register (nếu cần)
  @Post('register')
  @SetMetadata('customMessage', 'Register successfully')
  async register(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.authService.register(username, email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMe(@Req() req: { id: number }) {
    const userId = req.id;

    return this.authService.getMe(userId);
  }
}
