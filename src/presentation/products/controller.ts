import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors/custom.error';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProducts } from '../../domain/use-cases/product/get';
import { CreateProduct } from '../../domain/use-cases/product/create';

export class ProductController {
  // DI
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) return res.status(400).json({ error });

    new CreateProduct(this.productRepository)
      .execute(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };

  getProducts = async (req: Request, res: Response) => {
    const [error, paginationDto] = PaginationDto.create(req.query);

    if (error) return res.status(400).json({ error });

    new GetProducts(this.productRepository)
      .execute(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res));
  };
}
