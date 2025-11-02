import { Router } from 'express';
import { AuthController } from './controller';
import { AuthRepositoryImpl } from '../../infraestructure/repositories/auth.repository.impl';
import { AuthDatasourceImpl } from '../../infraestructure/datasources/auth.datasource.impl';
import { EmailDatasourceImpl } from '../../infraestructure/datasources/email.datasource.impl';
import { EmailRepositoryImpl } from '../../infraestructure/repositories/email.repository.impl';
import { envs } from '../../config/envs';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailDatasource = new EmailDatasourceImpl(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const emailRepository = new EmailRepositoryImpl(emailDatasource);

    const authDatasource = new AuthDatasourceImpl(emailRepository);
    const authRepository = new AuthRepositoryImpl(authDatasource);

    const controller = new AuthController(authRepository, emailRepository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}
