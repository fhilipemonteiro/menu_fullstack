import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';

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
  async getProductById(@Param('id') id: string) {
    return await this.productService.findProductById(id);
  }
}
