import { UploadedFile } from 'express-fileupload';
import type { FileRepository } from '../../repositories/file.repository';

export interface FileUseCase {
  execute(
    file: UploadedFile,
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }>;
}

export class FileUpload implements FileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  execute(
    file: UploadedFile,
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }> {
    return this.fileRepository.uploadSingle(file, folder, validExtensions);
  }
}
