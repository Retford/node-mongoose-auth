import { Response, Request, NextFunction } from 'express';

export class TypeMiddleWare {
  static validTypes(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.params.type;

      if (!validTypes.includes(type!)) {
        return res
          .status(400)
          .json({ error: `Invalid type: ${type}, valid ones ${validTypes}` });
      }
      next();
    };
  }
}
