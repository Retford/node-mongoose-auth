import type { UploadedFile } from 'express-fileupload';

export abstract class FileDatasource {
  abstract uploadSingle(
    file: UploadedFile,
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }>;
  abstract uploadMultiple(
    file: UploadedFile[],
    folder: string,
    validExtensions: string[]
  ): Promise<{ fileName: string }[]>;
}
