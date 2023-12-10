import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { linear_regression_routes } from './linear-regression/routes.application';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export interface ApiError {
  error: string;
  code: number;
  description?: string;
}

const global_error_handler = () => (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorResponse: ApiError = {
    error: err.message || 'Internal server error',
    code: err.statusCode || 500,
    description: err.description || 'An unexpected error occurred',
  };
  res.status(errorResponse.code).json(errorResponse);
}

app.use(global_error_handler());

app.use('/linear-regression', linear_regression_routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
