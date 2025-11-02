import { CategoryModel } from '../../data/mongo/models/category.model';
import { CategoryDatasource } from '../../domain/datasources/category.datasource';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class CategoryDatasourceImpl implements CategoryDatasource {
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
      throw CustomError.internalServer(`${error}`);
    }
  };
}
