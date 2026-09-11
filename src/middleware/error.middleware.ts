import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = error.meta?.target;

      if (Array.isArray(target) && target.includes('email')) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists',
        });
      }

      if (Array.isArray(target) && target.includes('studentCode')) {
        return res.status(409).json({
          success: false,
          message: 'Student code already exists',
        });
      }

      return res.status(409).json({
        success: false,
        message: 'Unique constraint violation',
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
