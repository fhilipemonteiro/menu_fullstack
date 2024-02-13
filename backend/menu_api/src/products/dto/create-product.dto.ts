import { IsNotEmpty, IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly qty: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsUrl()
  readonly photo: string;

  @IsNotEmpty()
  readonly categories: Category[];
}

class Category {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
