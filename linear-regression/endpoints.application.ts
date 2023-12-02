import { NextFunction, Request, Response } from 'express';
import { f_wb_x } from './model.domain';
import { getTrainingSet } from './training-set.data.infrastructure';


export interface TrainingSetResponse {
    features: number[];
    targets: number[];
}
export const linearRegressionTrainingSetEndpoint = {
    name: '/linear-regression/training-set',
    handler: async (req: Request, res: Response<TrainingSetResponse>, next: NextFunction) => {
        try {
            const trainingSet = await getTrainingSet();

            res.json(trainingSet);
        } catch (e) {
            next(e);
        }
    }
};

export interface PredictionByFeaturesResponse {
    predictions: number[];
    w: number;
    b: number;
}
export interface LinearRegressionQueryParams {
    w?: string;
    b?: string;
}
export const linearRegressionPredictionsByFeaturesEndpoint = {
    name: '/linear-regression/predictions-by-features',
    handler: async (req: Request<{}, {}, {}, LinearRegressionQueryParams>, res: Response<PredictionByFeaturesResponse>, next: NextFunction) => {
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
    }

};