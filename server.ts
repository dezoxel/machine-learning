import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { getTrainingSet } from './linear-regression/training-set.data';
import { f_wb_x } from './linear-regression/model';

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

export interface TrainingSetResponse {
  features: number[];
  targets: number[];
}

app.get('/linear-regression/training-set', async (req: Request, res: Response<TrainingSetResponse>, next: NextFunction) => {
  try {
    const trainingSet = await getTrainingSet();

    res.json(trainingSet);
  } catch (e) {
    next(e);
  }
});

export interface PredictionByFeaturesResponse {
  predictions: number[];
  w: number;
  b: number;
}
export interface LinearRegressionQueryParams {
  w?: string;
  b?: string;
}

app.get('/linear-regression/predictions-by-features', async (req: Request<{}, {}, {}, LinearRegressionQueryParams>, res: Response<PredictionByFeaturesResponse>, next: NextFunction) => {
  try {
    const { features: x } = await getTrainingSet();

    if (!req.query.w || !req.query.b) {
      throw new Error('Missing query params: w or b');
    }

    const w = parseFloat(req.query.w);
    const b = parseFloat(req.query.b);

    const f_wb = f_wb_x(w, b);
    const m = x.length;

    const y_hat = [];
    for (let i = 0; i < m; i++) {
      y_hat[i] = f_wb(x[i]);
    }

    res.json({ predictions: y_hat, w, b });
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
