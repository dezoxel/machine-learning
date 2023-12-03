import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { linear_regression_cost_function_by_wb_endpoint, linear_regression_cost_function_by_wb_range_endpoint, linear_regression_predictions_by_features_endpoint, linear_regression_training_set_endpoint } from './linear-regression/endpoints.application';

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

app.get(linear_regression_training_set_endpoint.name, linear_regression_training_set_endpoint.handler);
app.get(linear_regression_predictions_by_features_endpoint.name, linear_regression_predictions_by_features_endpoint.handler);
app.get(linear_regression_cost_function_by_wb_range_endpoint.name, linear_regression_cost_function_by_wb_range_endpoint.handler);
app.get(linear_regression_cost_function_by_wb_endpoint.name, linear_regression_cost_function_by_wb_endpoint.handler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
