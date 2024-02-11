import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findTopLevelCategories(): Promise<CategoryEntity[]> {
    // Database query to fetch top-level categories
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.parent IS NULL') // Filter categories without parent_id
      .getMany();
  }

  async findSubcategories(parentId: string): Promise<CategoryEntity[]> {
    // Database query to search for subcategories of especific category
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.parent = :parentId', { parentId }) // Filter the  subcategories with the corresponding parent_id
      .getMany();
  }
}
