import { IsInt, IsString, Min } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(0)
  isMedicine: number;

  @IsInt()
  @Min(0)
  status: number;
}
