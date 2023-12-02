import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { linearRegressionPredictionsByFeaturesEndpoint, linearRegressionTrainingSetEndpoint } from './linear-regression/endpoints.application';

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

const globalErrorHandler = () => (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorResponse: ApiError = {
    error: err.message || 'InternalServerError',
    code: err.statusCode || 500,
    description: err.description || 'An unexpected error occurred',
  };
  res.status(errorResponse.code).json(errorResponse);
}

app.use(globalErrorHandler());


app.get(linearRegressionTrainingSetEndpoint.name, linearRegressionTrainingSetEndpoint.handler);

app.get(linearRegressionPredictionsByFeaturesEndpoint.name, linearRegressionPredictionsByFeaturesEndpoint.handler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
