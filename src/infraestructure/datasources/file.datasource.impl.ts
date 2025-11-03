import fs from 'fs';
import path from 'path';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { FileDatasource } from '../../domain/datasources/file.datasource';

import type { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config/uuid.adapter';
import { CustomError } from '../../domain/errors/custom.error';

export interface FileResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  next: string | null;
  prev: string | null;
  categories: CategoryEntity[];
}

export class FileDatasourceImpl implements FileDatasource {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  };

  uploadSingle = async (
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ): Promise<{ fileName: string }> => {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        );
      }

      const destination = path.resolve(__dirname, '../../../', folder);
      this.checkFolder(destination);

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return { fileName };
    } catch (error) {
      throw error;
    }
  };

  uploadMultiple = async (
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ): Promise<{ fileName: string }[]> => {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );

    return fileNames;
  };
}
