import { Cost_Function } from "./cost_function.domain";
import { Model_Function, linear_regression_model } from "./model.domain";
import { create_vector_from_range } from "./vectors.domain";

export const calc_cost_function_for_linear_regression_by_range = (w_vector: number[], b_vector: number[]) => (cost_function: Cost_Function): number[][] => {
    const J_wb = w_vector.map((w) => {

        const J_fixed_w = b_vector.map((b) => {

            const model = linear_regression_model(w, b);
            const J = cost_function(model);

            return Number(J.toPrecision(2));
        });

        return J_fixed_w;
    });

    return J_wb;
}

export interface Cost_Function_Surface_By_WB_Range {
    w: number[];
    b: number[];
    J: number[][];
}

export const calc_cost_function_surface_for_linear_regression_by_range = (
    w_begin: number, w_end: number, w_step: number, b_begin: number, b_end: number, b_step: number, cost_function: Cost_Function
): Cost_Function_Surface_By_WB_Range => {

    const w_vector = create_vector_from_range(w_begin, w_end, w_step);
    const b_vector = create_vector_from_range(b_begin, b_end, b_step);

    const cost_function_values = calc_cost_function_for_linear_regression_by_range(w_vector, b_vector)(cost_function);

    const cost_function_surface = {
        w: w_vector,
        b: b_vector,
        J: cost_function_values,
    };

    return cost_function_surface;
};

export const calc_predictions_by_features = (model: Model_Function) => (x: number[]): number[] => {
    const m = x.length;

    const y_hat = [];
    for (let i = 0; i < m; i++) {
        y_hat[i] = model(x[i]);
    }

    return y_hat;
}