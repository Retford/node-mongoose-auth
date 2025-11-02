import { CategoryModel } from '../../data/mongo/models/category.model';
import { CategoryDatasource } from '../../domain/datasources/category.datasource';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export interface CategoryResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  next: string | null;
  prev: string | null;
  categories: Omit<CategoryEntity, 'user'>[];
}

export class CategoryDatasourceImpl implements CategoryDatasource {
  getCategories = async (
    paginationDto: PaginationDto
  ): Promise<CategoryResponse> => {
    const { page, limit } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        page,
        limit,
        total,
        totalPages,
        next:
          page < totalPages
            ? `/api/categories?page=${page + 1}&limit=${limit}`
            : null,
        prev:
          page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  };

  createCategory = async (
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<Omit<CategoryEntity, 'user'>> => {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        available: category.available,
        name: category.name,
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  };
}
