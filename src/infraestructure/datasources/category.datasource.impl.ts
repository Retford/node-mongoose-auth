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
  categories: CategoryEntity[];
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
        categories: categories.map((category) =>
          CategoryEntity.fromObject(category)
        ),
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  };

  createCategory = async (
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity> => {
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

      return CategoryEntity.fromObject(category);
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  };
}
