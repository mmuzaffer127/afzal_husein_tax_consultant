import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = schema.parse(req[source]);
      // Replace with parsed/sanitized data
      if (source === 'body') req.body = data;
      if (source === 'query') (req as any).validatedQuery = data;
      if (source === 'params') (req as any).validatedParams = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => e.message).join(', ');
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: messages,
          },
        });
        return;
      }
      next(error);
    }
  };
}
