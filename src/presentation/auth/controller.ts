import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthRegister } from '../../domain/use-cases/auth/register';
import { AuthLogin } from '../../domain/use-cases/auth/login';

import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { EmailRepository } from '../../domain/repositories/email.repository';
import { ValidateEmail } from '../../domain/use-cases/email/validate';

export class AuthController {
  // DI
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new AuthRegister(this.authRepository)
      .execute(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new AuthLogin(this.authRepository)
      .execute(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    new ValidateEmail(this.emailRepository)
      .execute(token!)
      .then(() => res.json('Email was validated property'))
      .catch((error) => this.handleError(error, res));
  };
}
