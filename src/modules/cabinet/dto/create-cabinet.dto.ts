import { IsString } from 'class-validator';

export class CreateCabinetDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly code: string;
}
