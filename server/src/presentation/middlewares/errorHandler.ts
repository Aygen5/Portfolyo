import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { DomainError } from '../../domain/errors/DomainError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed.',
      details: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  console.error('[server:error]', err);
  res.status(500).json({
    error: 'An unexpected server error occurred.',
  });
}
