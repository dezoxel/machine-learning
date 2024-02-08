import { NextFunction, Request, Response, Router } from 'express';
import { status_endpoint_handler } from '../../../platform/status-endpoint-handler';
import { available_cost_functions } from '../config';
import { calc_cost_function_for_linear_regression_fixed_b, calc_cost_function_for_linear_regression_fixed_w, calc_cost_function_surface_for_linear_regression_by_range, calc_predictions_by_features } from '../domain/calc';
import { gradient_descent_for_univariate_linear_regression, gradient_function_for_univariate_linear_regression } from '../domain/gradient-descent';
import { get_univariate_linear_regression_training_set } from '../infrastructure/training-set';
import { get_cost_function_by_name } from './cost_function.service';
import { get_number_from_query_string_factory, get_option_from_query_string_factory } from './validation.service';

export const univariate_linear_regression_controller = Router();

univariate_linear_regression_controller.get('/', status_endpoint_handler);

// -------------------------------------------------------------------------------- //
export interface Training_Set_Response {
    x: number[];
    y: number[];
}
univariate_linear_regression_controller.get('/training-set', async (_: Request, res: Response<Training_Set_Response>, next: NextFunction) => {
    try {
        const training_set = await get_univariate_linear_regression_training_set();

        res.json(training_set);
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Prediction_By_Features_Query_Params {
    w?: string;
    b?: string;
}
export interface Prediction_By_Features_Response {
    w: number;
    b: number;
    y_hat: number[];
}
univariate_linear_regression_controller.get('/predictions-by-features', async (req: Request, res: Response<Prediction_By_Features_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Prediction_By_Features_Query_Params>(req.query);

    try {
        const w = get_number_from_query_string('w');
        const b = get_number_from_query_string('b');

        const { x } = await get_univariate_linear_regression_training_set();

        const y_hat = calc_predictions_by_features(w, b, x);

        res.json({ y_hat, w, b });
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Cost_Function_By_WB_Range_Query_Params {
    w_begin?: string;
    w_end?: string;
    w_step?: string;
    b_begin?: string;
    b_end?: string;
    b_step?: string;
    cost_function_name?: string;
}
export interface Cost_Function_By_WB_Range_Response {
    w: number[];
    b: number[];
    J: number[][];
}
univariate_linear_regression_controller.get('/cost-function-by-wb-range', async (req: Request, res: Response<Cost_Function_By_WB_Range_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_By_WB_Range_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_By_WB_Range_Query_Params>(req.query);

    try {
        const w_begin = get_number_from_query_string('w_begin');
        const w_end = get_number_from_query_string('w_end');
        const w_step = get_number_from_query_string('w_step');
        const b_begin = get_number_from_query_string('b_begin');
        const b_end = get_number_from_query_string('b_end');
        const b_step = get_number_from_query_string('b_step');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions);
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { x, y } = await get_univariate_linear_regression_training_set();

        const cost_function_surface = calc_cost_function_surface_for_linear_regression_by_range(x, y, w_begin, w_end, w_step, b_begin, b_end, b_step, cost_function);

        res.json(cost_function_surface);
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Cost_Function_Range_Fixed_W_Query_Params {
    w?: string;
    b_begin?: string;
    b_end?: string;
    b_step?: string;
    cost_function_name?: string;
}
export interface Cost_Function_Range_Fixed_W_Response {
    b: number[];
    J: number[];
}
univariate_linear_regression_controller.get('/cost-function-range-fixed-w', async (req: Request, res: Response<Cost_Function_Range_Fixed_W_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_Range_Fixed_W_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_Range_Fixed_W_Query_Params>(req.query);

    try {
        const w = get_number_from_query_string('w');
        const b_begin = get_number_from_query_string('b_begin');
        const b_end = get_number_from_query_string('b_end');
        const b_step = get_number_from_query_string('b_step');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions);
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { x, y } = await get_univariate_linear_regression_training_set();

        const cost_function_fixed_w = calc_cost_function_for_linear_regression_fixed_w(x, y, w, b_begin, b_end, b_step, cost_function);

        res.json(cost_function_fixed_w);
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Cost_Function_Range_Fixed_B_Query_Params {
    b?: string;
    w_begin?: string;
    w_end?: string;
    w_step?: string;
    cost_function_name?: string;
}
export interface Cost_Function_Range_Fixed_B_Response {
    w: number[];
    J: number[];
}
univariate_linear_regression_controller.get('/cost-function-range-fixed-b', async (req: Request, res: Response<Cost_Function_Range_Fixed_B_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_Range_Fixed_B_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_Range_Fixed_B_Query_Params>(req.query);

    try {
        const b = get_number_from_query_string('b');
        const w_begin = get_number_from_query_string('w_begin');
        const w_end = get_number_from_query_string('w_end');
        const w_step = get_number_from_query_string('w_step');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions);
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { x, y } = await get_univariate_linear_regression_training_set();

        const cost_function_fixed_b = calc_cost_function_for_linear_regression_fixed_b(x, y, b, w_begin, w_end, w_step, cost_function);

        res.json(cost_function_fixed_b);
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
univariate_linear_regression_controller.get('/cost-function-by-wb', async (req: Request, res: Response<Cost_Function_By_WB_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Cost_Function_By_WB_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Cost_Function_By_WB_Query_Params>(req.query);

    try {
        const w = get_number_from_query_string('w');
        const b = get_number_from_query_string('b');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions);
        const cost_function = get_cost_function_by_name(cost_function_name);

        const { x, y } = await get_univariate_linear_regression_training_set();

        const J = cost_function(x, y, w, b);

        const costFunction = { w, b, J };

        res.json(costFunction);
    } catch (e) {
        next(e);
    }
});

// -------------------------------------------------------------------------------- //
export interface Train_Query_Params {
    max_iterations?: string;
    initial_w?: string;
    initial_b?: string;
    learning_rate?: string;
    cost_function_name?: string;
}
export interface Train_Response {
    w: number;
    b: number;
    J: number;
    i: number;
    h: { w: number, b: number }[];
}
univariate_linear_regression_controller.get('/train', async (req: Request, res: Response<Train_Response>, next: NextFunction) => {
    const get_number_from_query_string = get_number_from_query_string_factory<Train_Query_Params>(req.query);
    const get_option_from_query_string = get_option_from_query_string_factory<Train_Query_Params>(req.query);
    try {
        const max_iterations = get_number_from_query_string('max_iterations');
        const initial_w = get_number_from_query_string('initial_w');
        const initial_b = get_number_from_query_string('initial_b');
        const learning_rate = get_number_from_query_string('learning_rate');
        const cost_function_name = get_option_from_query_string('cost_function_name', available_cost_functions);
        const cost_function = get_cost_function_by_name(cost_function_name);
        const gradient_function = gradient_function_for_univariate_linear_regression;

        const { x, y } = await get_univariate_linear_regression_training_set();

        const J_precision = 0.0001;

        console.log('x', x);
        console.log('y', y);

        console.log(`Start training. ` +
            `J_precision: ${J_precision}. ` +
            `Max Iterations: ${max_iterations}. ` +
            `Initial W: ${initial_w}. ` +
            `Initial B: ${initial_b}. ` +
            `Learning Rate: ${learning_rate}. ` +
            `Cost Function: ${cost_function_name}.`)

        const { w, b, J, i, h } = gradient_descent_for_univariate_linear_regression(
            J_precision, max_iterations, learning_rate, initial_w, initial_b, x, y,
            cost_function, gradient_function, { print_results_every_n_iterations: 10 }
        );

        console.log(`Training completed. J=${J.toExponential(3)}, i=${i}, w=${w.toFixed(4)}, b=${b.toFixed(4)}`);

        res.json({ w, b, J, h, i });
    } catch (e) {
        next(e);
    }
});