import { multiple_linear_regression_model } from "./model";

export type Cost_Function_For_Multiple_Linear_Regression = (X: number[][], y: number[], w: number[], b: number) => number;

export const mean_squared_error_for_multiple_linear_regression: Cost_Function_For_Multiple_Linear_Regression =
    (X, y, w, b) => {
        const m = X.length;
        let cost = 0;

        for (let i = 0; i < m; i++) {
            const y_hat = multiple_linear_regression_model(w, b, X[i]);

            const error_i = Math.pow(y_hat - y[i], 2);
            cost += error_i;
        }

        const J = 1 / (2 * m) * cost;

        return J;
    }
