import { univariate_linear_regression_model } from "./model";
import { vector_from_range } from "../../../platform/math";
import { Cost_Function_For_Univariate_Linear_Regression } from "./cost-function";

export interface Cost_Function_Fixed_W {
    b: number[];
    J: number[];
}
export const calc_cost_function_for_linear_regression_fixed_w = (x: number[], y: number[], w: number, b_begin: number, b_end: number, b_step: number, cost_function: Cost_Function_For_Univariate_Linear_Regression): Cost_Function_Fixed_W => {
    const b_vector = vector_from_range(b_begin, b_end, b_step);

    const J_wb = b_vector.map((b) => {

        const J = cost_function(x, y, w, b);

        return Number(J.toPrecision(2));
    });

    return { b: b_vector, J: J_wb };
};

export interface Cost_Function_Fixed_B {
    w: number[];
    J: number[];
}
export const calc_cost_function_for_linear_regression_fixed_b = (x: number[], y: number[], b: number, w_begin: number, w_end: number, w_step: number, cost_function: Cost_Function_For_Univariate_Linear_Regression): Cost_Function_Fixed_B => {
    const w_vector = vector_from_range(w_begin, w_end, w_step);

    const J_wb = w_vector.map((w) => {

        const J = cost_function(x, y, w, b);

        return Number(J.toPrecision(2));
    });

    return { w: w_vector, J: J_wb };
};

export const calc_cost_function_for_linear_regression_by_range = (x: number[], y: number[], w_vector: number[], b_vector: number[], cost_function: Cost_Function_For_Univariate_Linear_Regression): number[][] => {
    const J_wb = w_vector.map((w) => {

        const J_fixed_w = b_vector.map((b) => {

            const J = cost_function(x, y, w, b);

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

export const calc_cost_function_surface_for_linear_regression_by_range = (x: number[], y: number[], w_begin: number, w_end: number, w_step: number, b_begin: number, b_end: number, b_step: number, cost_function: Cost_Function_For_Univariate_Linear_Regression): Cost_Function_Surface_By_WB_Range => {

    const w_vector = vector_from_range(w_begin, w_end, w_step);
    const b_vector = vector_from_range(b_begin, b_end, b_step);

    const cost_function_values = calc_cost_function_for_linear_regression_by_range(x, y, w_vector, b_vector, cost_function);

    const cost_function_surface = {
        w: w_vector,
        b: b_vector,
        J: cost_function_values,
    };

    return cost_function_surface;
};

export interface Cost_Function_Range_Fixed_B {
    w: number[];
    J: number[][];
}

export const calc_predictions_by_features = (w: number, b: number, x: number[]): number[] => {
    const m = x.length;

    const y_hat = [];
    for (let i = 0; i < m; i++) {
        y_hat[i] = univariate_linear_regression_model(w, b, x[i]);
    }

    return y_hat;
}