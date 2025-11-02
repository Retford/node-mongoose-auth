import { CreateProductDto } from '../../dtos/products/create-product.dto';
import { ProductEntity } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

export interface ProductUseCase {
  execute(
    createProductDto: CreateProductDto
  ): Promise<Omit<ProductEntity, 'user'>>;
}

export class CreateProduct implements ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(
    createCategoryDto: CreateProductDto
  ): Promise<Omit<ProductEntity, 'user'>> {
    return this.productRepository.createProduct(createCategoryDto);
  }
}
