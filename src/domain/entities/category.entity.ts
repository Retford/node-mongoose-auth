import { Validators } from '../../config/validators';
import { CustomError } from '../errors/custom.error';

export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public user: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, available, user } = object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!Validators.isMongoID(user))
      throw CustomError.badRequest('Missing user');

    const availableValue = available ?? false;

    return new CategoryEntity(id || _id, name, availableValue, user);
  }
}
