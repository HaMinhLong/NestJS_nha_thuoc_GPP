import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  readonly name: string;
}
