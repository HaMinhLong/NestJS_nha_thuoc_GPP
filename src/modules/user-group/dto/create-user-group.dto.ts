import { IsString } from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  readonly name: string;
}
