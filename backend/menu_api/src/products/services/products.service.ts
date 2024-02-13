import { Injectable, Res } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDTO } from '../dto/create-product.dto';
import { Response } from 'express';
import { ProductWithCategories } from '../interfaces/product-with-categories.interface';
import { ProductsEntity } from '../entities/products.entity';
import { CategoryWithParent } from '../interfaces/category-with-parent.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProduct(productData: CreateProductDTO, @Res() res: Response) {
    const product = await this.productsRepository.saveProduct(productData);
    if (!product) {
      return res.status(500).send({
        message: 'Internal Server Error.',
      });
    }
    return res.status(200).send(product);
  }

  async findAllProducts(): Promise<ProductWithCategories[]> {
    const [products, categories] = await Promise.all([
      this.productsRepository.findProducts(),
      this.productsRepository.findCategories(),
    ]);

    const productsWithCategories =
      await this.organizationProductsWithCategories(products, categories);

    return productsWithCategories;
  }

  async findProductById(id: string): Promise<ProductWithCategories> {
    const [product, categories] = await Promise.all([
      this.productsRepository.findByProductId(id),
      this.productsRepository.findCategories(),
    ]);

    const [productWithCategories] =
      await this.organizationProductsWithCategories(product, categories);

    return productWithCategories;
  }

  private organizationProductsWithCategories(
    product: ProductsEntity | ProductsEntity[],
    categories: CategoryWithParent[],
  ) {
    const products = Array.isArray(product) ? product : [product];

    const productsWithCategories = products.map((product) => {
      const categoriesForProduct = product.categories.map((category) => {
        const foundCategory = categories.find(({ id }) => id === category.id);

        if (foundCategory && foundCategory.parent_id) {
          return {
            id: foundCategory.id,
            name: foundCategory.name,
            parent_id: foundCategory.parent_id,
          };
        } else {
          return {
            id: category.id,
            name: category.name,
            parent_id: null,
          };
        }
      });

      return {
        id: product.id,
        name: product.name,
        qty: product.qty,
        price: product.price,
        photo: product.photo,
        categories: categoriesForProduct,
      };
    });

    return productsWithCategories;
  }
}
