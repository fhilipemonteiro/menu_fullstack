import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';
import { CreateProductDTO } from '../dto';
import { idIsValid } from 'src/helpers/interceptors';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async create(@Body() product: CreateProductDTO, @Res() res: Response) {
    return await this.productService.createProduct(product, res);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Get(':id')
  @UseInterceptors(idIsValid)
  async getProductById(@Param('id') id: string) {
    return await this.productService.findProductById(id);
  }
}
