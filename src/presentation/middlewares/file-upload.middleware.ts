import { Response, Request, NextFunction } from 'express';

export class FileMiddleWare {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were selected' });
    }

    if (!req.body) req.body = {};

    const fileField = req.files.file;

    if (!fileField) {
      return res
        .status(400)
        .json({ error: 'Expected "file" field in form-data' });
    }

    if (!Array.isArray(fileField)) {
      req.body.files = [fileField];
    } else {
      req.body.files = fileField;
    }

    next();
  }
}
