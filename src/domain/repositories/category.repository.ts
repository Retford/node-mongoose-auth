import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class CategoryRepository {
  abstract createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>>;
  abstract getCategories(): Promise<Omit<CategoryEntity, 'user'>[]>;
}
