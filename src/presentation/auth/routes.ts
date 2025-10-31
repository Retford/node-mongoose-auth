import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    router.post('/register', controller.registerUser);
    router.post('/login', controller.loginUser);

    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}
