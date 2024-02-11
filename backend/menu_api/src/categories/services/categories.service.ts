import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    // Search top-level categories (those withou parent_id)
    const topLevelCategories =
      await this.categoryRepository.findTopLevelCategories();

    // Recursive function to search for subcategories of a category
    const fetchSubcategories = async (category: CategoryEntity) => {
      category.categories = await this.categoryRepository.findSubcategories(
        category.id,
      );
      await Promise.all(
        category.categories.map(async (subCategory) => {
          await fetchSubcategories(subCategory); // Recursively calls to fetch the subcategories of the subcategories
        }),
      );
    };

    // For each top-level category, call the recursive function to fetch its subcategories
    await Promise.all(
      topLevelCategories.map(async (category) => {
        await fetchSubcategories(category);
      }),
    );

    return topLevelCategories;
  }
}
