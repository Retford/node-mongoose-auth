import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { envs } from '../../config/envs';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongo/models/user.model';
import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { CustomError } from '../../domain/errors/custom.error';
import { EmailRepository } from '../../domain/repositories/email.repository';
import { SendEmail } from '../../domain/use-cases/email/send';

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly emailRepository: EmailRepository) {}

  registerUser = async (
    registerUserDto: RegisterUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // Email de confirmación

      await this.sendEmailValidationLink(user.email);

      // JWT <--- para mantener la autenticación del usuario

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  loginUser = async (
    loginUserDto: LoginUserDto
  ): Promise<{ user: Omit<UserEntity, 'password'>; token: string }> => {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest('Email not exist');

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isMatching) throw CustomError.badRequest('Password is not valid');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token,
    };
  };

  private sendEmailValidationLink = async (email: string): Promise<boolean> => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer('Error getting token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
    <h1>Validate your email</h1>
    <p>Click on the following link to validate your email</p>
    <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    };

    const isSet = await new SendEmail(this.emailRepository).execute(options);
    if (!isSet) throw CustomError.internalServer('Error sending email');

    return true;
  };
}
