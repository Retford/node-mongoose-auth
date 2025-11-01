import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginUserDto } from '../dtos/auth/login-user.dto';

export abstract class AuthDatasource {
  abstract registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }>;

  abstract loginUser(
    loginUserDto: LoginUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }>;
}
