import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UserEntity } from '../entities/user.entity';

import type { CategoryResponse } from '../../infraestructure/datasources/category.datasource.impl';

export abstract class CategoryRepository {
  abstract createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity>;
  abstract getCategories(
    paginationDto: PaginationDto
  ): Promise<CategoryResponse>;
}
