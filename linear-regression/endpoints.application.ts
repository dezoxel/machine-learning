import { NextFunction, Request, Response } from 'express';
import { meanSquaredErrorForLinearRegression, linear_regression_model } from './model.domain';
import { getTrainingSet } from './training-set.data.infrastructure';


export interface Training_Set_Response {
    features: number[];
    targets: number[];
}
export const linear_regression_training_set_endpoint = {
    name: '/linear-regression/training-set',
    handler: async (req: Request, res: Response<Training_Set_Response>, next: NextFunction) => {
        try {
            const trainingSet = await getTrainingSet();

            res.json(trainingSet);
        } catch (e) {
            next(e);
        }
    }
};

export interface Prediction_By_Features_Response {
    predictions: number[];
    w: number;
    b: number;
}
export interface Linear_Regression_Query_Params {
    w?: string;
    b?: string;
}
export const linear_regression_predictions_by_features_endpoint = {
    name: '/linear-regression/predictions-by-features',
    handler: async (req: Request<{}, {}, {}, Linear_Regression_Query_Params>, res: Response<Prediction_By_Features_Response>, next: NextFunction) => {
        try {
            const { features: x } = await getTrainingSet();

            if (!req.query.w || !req.query.b) {
                throw new Error('Missing query params: w or b');
            }

            const w = parseFloat(req.query.w);
            const b = parseFloat(req.query.b);

            const f_wb = linear_regression_model(w, b);
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

export interface Cost_Function_By_WB_Range_Query_Params {
    w_begin: string;
    w_end: string;
    w_step: string;
    b_begin: string;
    b_end: string;
    b_step: string;
}
export interface Cost_Function_By_WB_Range_Response {
    w: number[];
    b: number[];
    J: number[][];
}
export const linear_regression_cost_function_by_wb_range_endpoint = {
    name: '/linear-regression/cost-function-by-wb-range',
    handler: async (req: Request<{}, {}, {}, Cost_Function_By_WB_Range_Query_Params>, res: Response<Cost_Function_By_WB_Range_Response>, next: NextFunction) => {
        try {
            const { features: x, targets: y } = await getTrainingSet();

            if (!req.query.w_begin || !req.query.w_end || !req.query.w_step) {
                throw new Error('Missing query params: w_begin, w_end, or w_step');
            }

            if (!req.query.b_begin || !req.query.b_end || !req.query.b_step) {
                throw new Error('Missing query params: b_begin, b_end, or b_step');
            }

            const w_begin = parseFloat(req.query.w_begin); // default: -2
            const w_end = parseFloat(req.query.w_end); // default: 4
            const w_step = parseFloat(req.query.w_step); // default: 0.25

            const b_begin = parseFloat(req.query.b_begin); // default: -3
            const b_end = parseFloat(req.query.b_end); // default: 3
            const b_step = parseFloat(req.query.b_step); // default: 0.25

            const sample_w_range: number[] = [];
            for (let w = w_begin; w <= w_end; w += w_step) {
                sample_w_range.push(w);
            }

            const sample_b_range: number[] = [];
            for (let b = b_begin; b <= b_end; b += b_step) {
                sample_b_range.push(b);
            }

            const sampleCostFunction = sample_w_range.map((w) => {

                const J_fixed_w = sample_b_range.map((b) => {
                    const J_wb = meanSquaredErrorForLinearRegression(w, b);
                    const J_wb_x = J_wb(x, y);
                    return Number(J_wb_x.toPrecision(2));
                });

                return J_fixed_w;
            });

            const costFunction = {
                w: sample_w_range,
                b: sample_b_range,
                J: sampleCostFunction,
            };

            res.json(costFunction);
        } catch (e) {
            next(e);
        }
    }
};

export interface Cost_Function_By_WB_Query_Params {
    w?: string;
    b?: string;
}
export interface Cost_Function_By_WB_Response {
    w: number;
    b: number;
    J: number;
}
export const linear_regression_cost_function_by_wb_endpoint = {
    name: '/linear-regression/cost-function-by-wb',
    handler: async (req: Request<{}, {}, {}, Linear_Regression_Query_Params>, res: Response<Cost_Function_By_WB_Response>, next: NextFunction) => {
        try {
            const { features: x, targets: y } = await getTrainingSet();

            if (!req.query.w || !req.query.b) {
                throw new Error('Missing query params: w or b');
            }

            const w = parseFloat(req.query.w);
            const b = parseFloat(req.query.b);

            const J_wb = meanSquaredErrorForLinearRegression(w, b);
            const J_wb_x = J_wb(x, y);

            const costFunction = {
                w,
                // TODO: implement this
                b,
                J: J_wb_x,
            };

            res.json(costFunction);
        } catch (e) {
            next(e);
        }
    }
};