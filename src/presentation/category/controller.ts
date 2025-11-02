import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors/custom.error';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategory } from '../../domain/use-cases/category/create';
import { GetCategories } from '../../domain/use-cases/category/get';

export class CategoryController {
  // DI
  constructor(private readonly categoryRepository: CategoryRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateCategory(this.categoryRepository)
      .execute(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };

  getCategories = async (req: Request, res: Response) => {
    new GetCategories(this.categoryRepository)
      .execute()
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };
}
