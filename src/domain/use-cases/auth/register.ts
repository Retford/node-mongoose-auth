import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { AuthRepository } from '../../repositories/auth.repository';

export interface AuthUseCase {
  execute(
    registerDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }>;
}

export class AuthRegister implements AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(
    registerDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> {
    return this.authRepository.registerUser(registerDto);
  }
}
