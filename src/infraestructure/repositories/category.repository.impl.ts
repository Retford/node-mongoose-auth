import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryDatasource } from '../../domain/datasources/category.datasource';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

import type { CategoryResponse } from '../datasources/category.datasource.impl';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}

  getCategories(paginationDto: PaginationDto): Promise<CategoryResponse> {
    return this.categoryDatasource.getCategories(paginationDto);
  }

  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>> {
    return this.categoryDatasource.createCategory(createCategoryDto, user);
  }
}
