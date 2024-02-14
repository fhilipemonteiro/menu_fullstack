import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';
import { CreateProductDTO } from '../dto';
import { idIsValid } from 'src/helpers/interceptors';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async create(@Body() product: CreateProductDTO, @Res() res: Response) {
    return await this.productService.createProduct(product, res);
  }

  @Get()
  async getAllProducts(@Res() res: Response) {
    return await this.productService.findAllProducts(res);
  }

  @Get(':id')
  @UseInterceptors(idIsValid)
  async getProductById(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.findProductById(id, res);
  }

  @Patch(':id')
  @UseInterceptors(idIsValid)
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
    @Res() res: Response,
  ) {
    return await this.productService.updateProduct(id, product, res);
  }

  @Delete(':id')
  @UseInterceptors(idIsValid)
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    return await this.productService.deleteProduct(id, res);
  }
}
