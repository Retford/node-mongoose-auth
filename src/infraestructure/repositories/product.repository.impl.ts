import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import type { ProductResponse } from '../datasources/product.datasource.impl';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDatasource) {}
  getProducts(paginationDto: PaginationDto): Promise<ProductResponse> {
    return this.productDatasource.getProducts(paginationDto);
  }

  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productDatasource.createProduct(createProductDto);
  }
}
