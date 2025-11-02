import { ProductModel } from '../../data/mongo/models/product.model';
import { ProductDatasource } from '../../domain/datasources/product.datasource';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CustomError } from '../../domain/errors/custom.error';

export interface ProductResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  next: string | null;
  prev: string | null;
  products: ProductEntity[];
}

export class ProductDatasourceImpl implements ProductDatasource {
  getProducts = async (
    paginationDto: PaginationDto
  ): Promise<ProductResponse> => {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category'),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        page,
        limit,
        total,
        totalPages,
        next:
          page < totalPages
            ? `/api/products?page=${page + 1}&limit=${limit}`
            : null,
        prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products.map((product) => ProductEntity.fromObject(product)),
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error' + error);
    }
  };

  createProduct = async (
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> => {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExists) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return ProductEntity.fromObject(product);
    } catch (error) {
      throw CustomError.internalServer('Internal server error ');
    }
  };
}
