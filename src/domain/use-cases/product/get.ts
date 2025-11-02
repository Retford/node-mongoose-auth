import { ProductRepository } from '../../repositories/product.repository';
import { PaginationDto } from '../../dtos/shared/pagination.dto';
import { ProductResponse } from '../../../infraestructure/datasources/product.datasource.impl';

export interface ProductUseCase {
  execute(paginationDto: PaginationDto): Promise<ProductResponse>;
}

export class GetProducts implements ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(paginationDto: PaginationDto): Promise<ProductResponse> {
    return this.productRepository.getProducts(paginationDto);
  }
}
