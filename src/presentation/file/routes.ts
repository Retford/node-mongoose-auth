import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileDatasourceImpl } from '../../infraestructure/datasources/file.datasource.impl';
import { FileRepositoryImpl } from '../../infraestructure/repositories/file.repository.impl';
import { FileMiddleWare } from '../middlewares/file-upload.middleware';
import { ValidateTypeMiddleware } from '../middlewares/validate-type.middleware';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    const fileDatasourceImpl = new FileDatasourceImpl();
    const fileRepositoryImpl = new FileRepositoryImpl(fileDatasourceImpl);

    const controller = new FileUploadController(fileRepositoryImpl);

    //* Middlewares
    router.use(FileMiddleWare.containFiles);
    router.use(ValidateTypeMiddleware.validate);

    // api/upload/single/<user | category | product>/
    router.post('/single/:type', controller.uploadFile);

    // api/upload/multiple/<user | category | product>/
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}
