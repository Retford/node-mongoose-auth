import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }>;
}
