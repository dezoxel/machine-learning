import { Cost_Function_For_Multiple_Linear_Regression } from "./cost-function";
import { multiple_linear_regression_model } from "./model";

export type Gradient_Function_For_Multiple_Linear_Regression = (X: number[][], y: number[], w: number[], b: number) => { dj_dw: number[], dj_db: number };
export const gradient_function_for_multiple_linear_regression: Gradient_Function_For_Multiple_Linear_Regression =
    (X, y, w, b) => {
        const m = X.length;
        const n = X[0].length;
        let dj_dw: number[] = [];
        let dj_db = 0;

        for (let i = 0; i < m; i++) {
            const y_hat = multiple_linear_regression_model(w, b, X[i]);
            const error_i = y_hat - y[i];

            for (let j = 0; j < n; j++) {
                dj_dw[j] = (dj_dw[j] ?? 0) + error_i * X[i][j];
            }

            const dj_db_i = error_i;

            dj_db += dj_db_i;
        }

        for (let j = 0; j < n; j++) {
            dj_dw[j] = dj_dw[j] / m;
        }
        dj_db = dj_db / m;

        return { dj_dw, dj_db };
    };


export type Gradient_Descent_For_Linear_Regression = (
    suitable_J: number,
    max_iterations: number,
    alpha: number,
    initial_w: number[],
    initial_b: number,
    X: number[][],
    y: number[],
    cost_function: Cost_Function_For_Multiple_Linear_Regression,
    gradient_function: Gradient_Function_For_Multiple_Linear_Regression
) => {
    w: number[];
    b: number;
    J: number;
    J_history: number[];
    params_history: { w: number[], b: number }[];
    i: number;
};

export const gradient_descent_for_linear_regression: Gradient_Descent_For_Linear_Regression =
    (J_precision, max_iterations, alpha, initial_w, initial_b, X, y, cost_function, gradient_function) => {
        let w = initial_w;
        let b = initial_b;
        let J = 1;
        const J_history: number[] = [];
        const params_history: { w: number[], b: number }[] = [];

        let i = 0;
        while (J > J_precision && i < max_iterations) {
            const { dj_dw, dj_db } = gradient_function(X, y, w, b);

            for (let j = 0; j < w.length; j++) {
                w[j] = w[j] - alpha * dj_dw[j];
            }
            b = b - alpha * dj_db;

            J = cost_function(X, y, w, b);
            J_history.push(J);

            if (i % 100 === 0) {
                console.log(
                    `Iteration ${i.toString().padStart(4, ' ')}: ` +
                    `J = ${J.toExponential(2)}; ` +
                    `w = [${w.map((wj) => wj.toExponential(3)).join(' ')}], ` +
                    `b = ${b.toExponential(5)}`);
            }

            // if (i % 100 === 0) {
            //     console.log(`Iteration ${i.toString().padStart(4, ' ')}: J = ${J.toExponential(2)}; w = ${w.map(wj => wj.toExponential(3))}, b = ${b.toExponential(5)}`);
            //     params_history.push({ w, b });
            // }
            i++;
        }

        return { w, b, J, J_history, params_history, i };
    };