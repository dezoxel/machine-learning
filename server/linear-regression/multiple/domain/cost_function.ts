import { Multiple_Linear_Regression_Model_Function } from "./model";

export type Cost_Function = (model: Multiple_Linear_Regression_Model_Function) => number;

export const mean_squared_error = (X: number[][], y: number[]) => (model: Multiple_Linear_Regression_Model_Function) => {
    const m = X.length;
    let cost = 0;

    for (let i = 0; i < m; i++) {
        const y_hat = model(X[i]);

        const error_i = Math.pow(y_hat - y[i], 2);
        cost += error_i;
    }

    const J = 1 / (2 * m) * cost;

    return J;
}
