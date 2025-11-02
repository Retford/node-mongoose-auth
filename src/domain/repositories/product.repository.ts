import { PaginationDto } from '../dtos/shared/pagination.dto';

import { CreateProductDto } from '../dtos/products/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

import type { ProductResponse } from '../../infraestructure/datasources/product.datasource.impl';

export abstract class ProductRepository {
  abstract createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity>;
  abstract getProducts(paginationDto: PaginationDto): Promise<ProductResponse>;
}
