import { ApiError } from './global-error-handler';

import { Request, Response, NextFunction } from 'express';


export const global_error_handler = () => (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorResponse: ApiError = {
    error: err.message || 'Internal server error',
    code: err.statusCode || 500,
    description: err.description || 'An unexpected error occurred',
  };
  res.status(errorResponse.code).json(errorResponse);
};export interface ApiError {
  error: string;
  code: number;
  description?: string;
}

