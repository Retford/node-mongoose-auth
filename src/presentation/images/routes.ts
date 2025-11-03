import { Router } from 'express';
import { ImagenController } from './controller';

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ImagenController();

    router.get('/:type/:img', controller.getImage);

    return router;
  }
}
