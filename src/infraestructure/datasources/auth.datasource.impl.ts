import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { UserModel } from '../../data/mongo/models/user.model';
import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthDatasourceImpl implements AuthDatasource {
  async registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // JWT <--- para mantener la autenticación del usuario

      // Email de confirmación

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: 'ABC',
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
