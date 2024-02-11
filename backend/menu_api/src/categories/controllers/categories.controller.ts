import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Get()
  async getCategories() {
    return await this.categoryService.findAllCategories();
  }
}
