import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

export interface CategoryUseCase {
  execute(): Promise<Omit<CategoryEntity, 'user'>[]>;
}

export class GetCategories implements CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(): Promise<Omit<CategoryEntity, 'user'>[]> {
    return this.categoryRepository.getCategories();
  }
}
