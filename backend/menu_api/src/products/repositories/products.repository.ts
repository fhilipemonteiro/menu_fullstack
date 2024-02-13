import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from '../dto/create-product.dto';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { CategoryWithParent } from '../interfaces/category-with-parent.interface';

export class ProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productEntity: Repository<ProductsEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async saveProduct(productData: CreateProductDTO) {
    const newProduct = this.productEntity.create(productData);

    return this.productEntity.save(newProduct);
  }

  async findProducts(): Promise<ProductsEntity[]> {
    return this.productEntity.find({
      relations: ['categories'],
    });
  }

  async findCategories(): Promise<CategoryWithParent[]> {
    const categories = await this.categoryEntity.find({
      relations: ['parent'],
    });
    const categoriesWithParentId = categories.map((category) => ({
      id: category.id,
      name: category.name,
      parent_id: category.parent ? category.parent.id : null,
    }));

    return categoriesWithParentId;
  }

  async findByProductId(id: string): Promise<ProductsEntity> {
    return this.productEntity.findOne({
      relations: ['categories'],
      where: { id },
    });
  }
}
