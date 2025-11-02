import { CustomError } from '../errors/custom.error';
import { UserEntity } from './user.entity';

export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public user: UserEntity
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, available, user } = object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!user) throw CustomError.badRequest('Missing user');

    const availableValue = available ?? false;

    const userEntity =
      typeof user === 'string'
        ? new UserEntity(user, '', '', false, '', [], '')
        : UserEntity.fromObject(user);

    return new CategoryEntity(id || _id, name, availableValue, userEntity);
  }
}
