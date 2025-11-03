import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors/custom.error';
import { FileUpload } from '../../domain/use-cases/file/upload';
import { FileRepository } from '../../domain/repositories/file.repository';
import type { UploadedFile } from 'express-fileupload';
import { FileUploadMultiple } from '../../domain/use-cases/file/upload-multiple';

export class FileUploadController {
  // DI
  constructor(private readonly fileRepository: FileRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  uploadFile = (req: Request, res: Response) => {
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const file = req.body.files.at(0) as UploadedFile;
    const folder = req.body.folder;

    new FileUpload(this.fileRepository)
      .execute(file, folder, validExtensions)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const files = req.body.files as UploadedFile[];
    const folder = req.body.folder;

    new FileUploadMultiple(this.fileRepository)
      .execute(files, folder, validExtensions)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));
  };
}
