import { Model_Function } from "./model.domain";

export type Cost_Function = (model: Model_Function) => number;

export const mean_squared_error = (x: number[], y: number[]) => (model: Model_Function) => {
    const m = x.length;

    let sum = 0;
    for (let i = 0; i < m; i++) {
        const y_hat_i = model(x[i]);

        const error_i = Math.pow(y_hat_i - y[i], 2);
        sum += error_i;
    }

    const J = 1 / (2 * m) * sum;

    return J;
}

export const mean_absolute_error = (x: number[], y: number[]) => (model: Model_Function) => {
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
