import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UserEntity } from '../entities/user.entity';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import type { CategoryResponse } from '../../infraestructure/datasources/category.datasource.impl';

export abstract class CategoryDatasource {
  abstract createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>>;
  abstract getCategories(
    paginationDto: PaginationDto
  ): Promise<CategoryResponse>;
}
