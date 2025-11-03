import { UploadedFile } from 'express-fileupload';
import { FileDatasource } from '../../domain/datasources/file.datasource';
import { FileRepository } from '../../domain/repositories/file.repository';

export class FileRepositoryImpl implements FileRepository {
  constructor(private readonly fileDatasource: FileDatasource) {}

  uploadSingle(
    file: UploadedFile,
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }> {
    return this.fileDatasource.uploadSingle(file, folder, validExtensions);
  }
  uploadMultiple(
    file: UploadedFile[],
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }[]> {
    return this.fileDatasource.uploadMultiple(file, folder, validExtensions);
  }
}
