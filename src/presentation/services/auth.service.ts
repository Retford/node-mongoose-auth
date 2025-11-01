import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { UserModel } from '../../data/mongo/models/user.model';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthService {
  constructor() {}

  public registerUser = async (registerUserDto: RegisterUserDto) => {
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
  };

  public loginUser = async (loginUserDto: LoginUserDto) => {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest('Email is not exist');

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw CustomError.badRequest('Password is not exist');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    return {
      user: userEntity,
      token: 'ABC',
    };
  };
}
