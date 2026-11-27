import { NextFunction, Request, Response } from 'express';
import { env } from '../../config/env';
import { UnauthorizedError } from '../../domain/errors/DomainError';

export function adminAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const headerSecret = req.headers['x-admin-secret'];
  const authHeader = req.headers.authorization;
  const bearerSecret =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice('Bearer '.length).trim()
      : undefined;

  const provided =
    (typeof headerSecret === 'string' ? headerSecret.trim() : undefined) ||
    bearerSecret;

  if (!provided || provided !== env.adminSecret) {
    next(new UnauthorizedError('Invalid or missing admin credentials.'));
    return;
  }

  next();
}
