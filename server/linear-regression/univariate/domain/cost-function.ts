import { univariate_linear_regression_model } from "./model";

export type Cost_Function_For_Univariate_Linear_Regression = (x: number[], y: number[], w: number, b: number) => number;

export const mean_squared_error_for_univariate_linear_regression: Cost_Function_For_Univariate_Linear_Regression =
    (x, y, w, b) => {
        const m = x.length;
        let cost = 0;

        for (let i = 0; i < m; i++) {
            const y_hat = univariate_linear_regression_model(w, b, x[i]);

            const error_i = Math.pow(y_hat - y[i], 2);
            cost += error_i;
        }

        const J = 1 / (2 * m) * cost;

        return J;
    }

export const mean_absolute_error_for_univariate_linear_regression: Cost_Function_For_Univariate_Linear_Regression =
    (x, y, w, b) => {
        const m = x.length;

        let sum = 0;
        for (let i = 0; i < m; i++) {
            const y_hat_i = univariate_linear_regression_model(w, b, x[i]);

            const error_i = Math.abs(y_hat_i - y[i]);
            sum += error_i;
        }

        const J = 1 / m * sum;

        return J;
    }
