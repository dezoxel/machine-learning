import { NextFunction, Request, Response, Router } from 'express';
import { calc_cost_function_surface_for_linear_regression_by_range, calc_predictions_by_features } from './calc.domain';
import { available_cost_functions } from './config';
import { mean_squared_error } from './cost_function.domain';
import { linear_regression_model } from './model.domain';
import { getTrainingSet } from './training-set.data.infrastructure';
import { get_number_from_query_string_factory, get_option_from_query_string_factory } from './validation.application';
import { get_cost_function_by_name } from './cost_function.application';

export const linear_regression_routes = Router();

// -------------------------------------------------------------------------------- //
export interface Training_Set_Response {
    features: number[];
    targets: number[];
}
linear_regression_routes.get('/training-set', async (_: Request, res: Response<Training_Set_Response>, next: NextFunction) => {
    try {
        const trainingSet = await getTrainingSet();

        res.json(trainingSet);
    } catch (e) {
        next(e);
    }
});

export interface Prediction_By_Features_Response {
    w: number;
    b: number;
    predictions: number[];
}
export interface Linear_Regression_Query_Params {
    w?: string;
    b?: string;
}
linear_regression_routes.get('/predictions-by-features', async (req: Request<{}, {}, {}, Linear_Regression_Query_Params>, res: Response<Prediction_By_Features_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Linear_Regression_Query_Params>(req.query);

    try {
        const w = get_number_from_query_string('w');
        const b = get_number_from_query_string('b');

        const { features: x } = await getTrainingSet();

        const model = linear_regression_model(w, b);

        const y_hat = calc_predictions_by_features(model)(x);

        res.json({ predictions: y_hat, w, b });
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Cost_Function_By_WB_Range_Query_Params {
    w_begin: string;
    w_end: string;
    w_step: string;
    b_begin: string;
    b_end: string;
    b_step: string;
    cost_function_name?: string;
}
export interface Cost_Function_By_WB_Range_Response {
    w: number[];
    b: number[];
    J: number[][];
}
linear_regression_routes.get('/cost-function-by-wb-range', async (req: Request<{}, {}, {}, Cost_Function_By_WB_Range_Query_Params>, res: Response<Cost_Function_By_WB_Range_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_By_WB_Range_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_By_WB_Query_Params>(req.query);

    try {
        const w_begin = get_number_from_query_string('w_begin');  // default: -2
        const w_end = get_number_from_query_string('w_end');  // default: 4
        const w_step = get_number_from_query_string('w_step');  // default: 0.25
        const b_begin = get_number_from_query_string('b_begin');  // default: -3
        const b_end = get_number_from_query_string('b_end');  // default: 3
        const b_step = get_number_from_query_string('b_step');  // default: 0.25
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions); // default: mean_squared_error
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { features: x, targets: y } = await getTrainingSet();
        const cost = cost_function(x, y);

        const cost_function_surface = calc_cost_function_surface_for_linear_regression_by_range(w_begin, w_end, w_step, b_begin, b_end, b_step, cost);

        res.json(cost_function_surface);
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Cost_Function_By_WB_Query_Params {
    w?: string;
    b?: string;
    cost_function_name?: string;
}
export interface Cost_Function_By_WB_Response {
    w: number;
    b: number;
    J: number;
}
linear_regression_routes.get('/cost-function-by-wb', async (req: Request<{}, {}, {}, Linear_Regression_Query_Params>, res: Response<Cost_Function_By_WB_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_By_WB_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_By_WB_Query_Params>(req.query);

    try {
        const w = get_number_from_query_string('w');
        const b = get_number_from_query_string('b');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions); // default: mean_squared_error
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { features: x, targets: y } = await getTrainingSet();
        const cost = cost_function(x, y);

        const model = linear_regression_model(w, b);

        const J = cost(model);

        const costFunction = { w, b, J };

        res.json(costFunction);
    } catch (e) {
        next(e);
    }
});
