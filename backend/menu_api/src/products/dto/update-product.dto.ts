import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly qty?: number;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsString()
  readonly photo?: string;

  @IsOptional()
  readonly categories?: Category[];
}

class Category {
  @IsOptional()
  @IsString()
  readonly id: string;
}
