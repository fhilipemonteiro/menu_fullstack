import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';
import { CreateProductDTO } from '../dto';

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
}
