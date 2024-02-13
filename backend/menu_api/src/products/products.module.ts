import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, CategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
