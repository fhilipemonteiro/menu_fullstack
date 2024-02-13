import { Controller, Get, Res } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { Response } from 'express';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Get()
  async getCategories(@Res() res: Response) {
    return await this.categoryService.findAllCategories(res);
  }
}
