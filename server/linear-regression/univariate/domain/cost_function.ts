import { Univariate_Linear_Regression_Model_Function } from "./model";

export type Cost_Function = (model: Univariate_Linear_Regression_Model_Function) => number;

export const mean_squared_error = (x: number[], y: number[]) => (model: Univariate_Linear_Regression_Model_Function) => {
    const m = x.length;
    let cost = 0;

    for (let i = 0; i < m; i++) {
        const f_wb = model(x[i]);

        const error_i = Math.pow(f_wb - y[i], 2);
        cost += error_i;
    }

    const J = 1 / (2 * m) * cost;

    return J;
}

export const mean_absolute_error = (x: number[], y: number[]) => (model: Univariate_Linear_Regression_Model_Function) => {
    const m = x.length;

    let sum = 0;
    for (let i = 0; i < m; i++) {
        const y_hat_i = model(x[i]);

        const error_i = Math.abs(y_hat_i - y[i]);
        sum += error_i;
    }

    const J = 1 / m * sum;

    return J;
}
