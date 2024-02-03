import { NextFunction, Request, Response, Router } from 'express';
import { get_multiple_regression_training_set } from '../infrastructure/training-set.data';

export const multiple_linear_regression_controller = Router();

// -------------------------------------------------------------------------------- //
export interface Training_Set_Response {
    features: number[][];
    targets: number[];
    feature_names: string[];
}
multiple_linear_regression_controller.get('/training-set', async (_: Request, res: Response<Training_Set_Response>, next: NextFunction) => {
    try {
        const training_set = await get_multiple_regression_training_set();

        res.json({
            ...training_set,
            feature_names: ['size (sqft)', 'bedrooms', 'floors', 'age (years)'],
        });
    } catch (e) {
        next(e);
    }
});

