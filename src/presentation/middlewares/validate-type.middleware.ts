import { Request, Response, NextFunction } from 'express';

export class ValidateTypeMiddleware {
  static allowedTypes = ['users', 'products', 'categories'];

  static validate(req: Request, res: Response, next: NextFunction) {
    const type = req.url.split('/').at(2) ?? '';

    if (!ValidateTypeMiddleware.allowedTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type: ${type}. Valid ones are: ${ValidateTypeMiddleware.allowedTypes.join(
          ', '
        )}`,
      });
    }

    if (!req.body) {
      req.body = {};
    }

    req.body.folder = `uploads/${type}`;

    next();
  }
}
