import { Router } from 'express';
import { AuthController } from './controller';
// import { AuthService } from '../services/auth.service';
// import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthRepositoryImpl } from '../../infraestructure/repositories/auth.repository.impl';
import { AuthDatasourceImpl } from '../../infraestructure/datasources/auth.datasource.impl';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    // const authService = new AuthService();
    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);

    const controller = new AuthController(authRepository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}
