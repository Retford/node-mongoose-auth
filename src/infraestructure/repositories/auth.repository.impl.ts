import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}
  LoginUser(
    loginUserDto: LoginUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> {
    return this.authDatasource.loginUser(loginUserDto);
  }
  // LoginUser(
  //   loginUserDto: LoginUserDto
  // ): Promise<{ user: UserEntity; token: string }> {
  //   return this.authDatasource.loginUser(loginUserDto);
  // }

  registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> {
    return this.authDatasource.registerUser(registerUserDto);
  }
}
