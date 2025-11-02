import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { CategoryEntity } from '../../entities/category.entity';
import { UserEntity } from '../../entities/user.entity';
import { CategoryRepository } from '../../repositories/category.repository';

export interface CategoryUseCase {
  execute(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>>;
}

export class CreateCategory implements CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>> {
    return this.categoryRepository.createCategory(createCategoryDto, user);
  }
}
