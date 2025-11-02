import { PaginationDto } from '../../dtos/shared/pagination.dto';
import { CategoryRepository } from '../../repositories/category.repository';

import type { CategoryResponse } from '../../../infraestructure/datasources/category.datasource.impl';

export interface CategoryUseCase {
  execute(paginationDto: PaginationDto): Promise<CategoryResponse>;
}

export class GetCategories implements CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(paginationDto: PaginationDto): Promise<CategoryResponse> {
    return this.categoryRepository.getCategories(paginationDto);
  }
}
