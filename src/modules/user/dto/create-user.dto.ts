import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  readonly username: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  phone: string;

  @IsInt()
  @Min(0)
  status: number;
}
