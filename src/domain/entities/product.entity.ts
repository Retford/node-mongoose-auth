import { CustomError } from '../errors/custom.error';

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public user: string,
    public category: string,
    public price?: number,
    public description?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, available, price, description, user, category } =
      object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!user) throw CustomError.badRequest('Missing user');
    if (!category) throw CustomError.badRequest('Missing category');

    const availableValue = available ?? false;

    return new ProductEntity(
      id || _id,
      name,
      availableValue,
      user,
      category,
      price,
      description
    );
  }
}
