import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryDatasource } from '../../domain/datasources/category.datasource';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}
  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>> {
    return this.categoryDatasource.createCategory(createCategoryDto, user);
  }
}
