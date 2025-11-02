import { Validators } from '../../../config/validators';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: string,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ['Missing name'];
    if (!Validators.isMongoID(user)) return ['Invalid User ID'];
    if (!Validators.isMongoID(category)) return ['Invalid Category ID'];

    let availableBoolean = available;

    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }

    return [
      ,
      new CreateProductDto(
        name,
        availableBoolean,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
