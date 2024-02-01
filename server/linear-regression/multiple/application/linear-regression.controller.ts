import { NextFunction, Request, Response, Router } from 'express';
import { get_multiple_regression_training_set } from '../infrastructure/training-set.data';

export const multiple_linear_regression_controller = Router();

// -------------------------------------------------------------------------------- //
export interface Training_Set_Response {
    features: number[][];
    targets: number[];
}
multiple_linear_regression_controller.get('/training-set', async (_: Request, res: Response<Training_Set_Response>, next: NextFunction) => {
    try {
        const trainingSet = await get_multiple_regression_training_set();

        res.json(trainingSet);
    } catch (e) {
        next(e);
    }
});

