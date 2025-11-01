import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { AuthRepository } from '../../repositories/auth.repository';

export interface AuthUseCase {
  execute(
    loginUserDto: LoginUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }>;
}

export class AuthLogin implements AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(
    loginUserDto: LoginUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> {
    return this.authRepository.LoginUser(loginUserDto);
  }
}
