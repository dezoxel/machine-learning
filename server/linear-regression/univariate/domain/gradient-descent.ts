import { Cost_Function_For_Univariate_Linear_Regression } from "./cost-function";
import { univariate_linear_regression_model } from "./model";

export type Gradient_Function_For_Univariate_Linear_Regression = (x: number[], y: number[], w: number, b: number) => { dj_dw: number, dj_db: number };
export const gradient_function_for_univariate_linear_regression: Gradient_Function_For_Univariate_Linear_Regression =
    (x, y, w, b) => {
        const m = x.length;
        let dj_dw = 0;
        let dj_db = 0;

        for (let i = 0; i < m; i++) {
            const y_hat = univariate_linear_regression_model(w, b, x[i]);

            const dj_dw_i = (y_hat - y[i]) * x[i];
            const dj_db_i = y_hat - y[i];

            dj_dw += dj_dw_i;
            dj_db += dj_db_i;
        }

        dj_dw = dj_dw / m;
        dj_db = dj_db / m;

        return { dj_dw, dj_db };
    };

export type Gradient_Descent_For_Univariate_Linear_Regression = (
    J_precision: number,
    max_iterations: number,
    alpha: number,
    initial_w: number,
    initial_b: number,
    x: number[],
    y: number[],
    cost_function: Cost_Function_For_Univariate_Linear_Regression,
    gradient_function: Gradient_Function_For_Univariate_Linear_Regression,
    trace_config: { print_results_every_n_iterations: number }
) => {
    w: number;
    b: number;
    J: number;
    h: { w: number, b: number, J: number }[];
    i: number;
};
export const gradient_descent_for_univariate_linear_regression: Gradient_Descent_For_Univariate_Linear_Regression =
    (J_precision, max_iterations, alpha, initial_w, initial_b, x, y, cost_function, gradient_function, trace_config) => {
        let w = initial_w;
        let b = initial_b;
        let J = 1;
        const h: { w: number, b: number, J: number }[] = [];

        let i = 0;
        for (; i < max_iterations; i++) {
            if (J < J_precision) {
                console.log('Cost reached required precision: ', J_precision);
                break;
            }

            if (J === Infinity) {
                console.log('Cost reached Infinity');
                break;
            }

            const { dj_dw, dj_db } = gradient_function(x, y, w, b);
            w = w - alpha * dj_dw;
            b = b - alpha * dj_db;

            J = cost_function(x, y, w, b);

            h.push({ w, b, J });

            if (i % trace_config.print_results_every_n_iterations === 0) {
                console.log(`Iteration ${i.toString().padStart(4, ' ')}: J = ${J.toExponential(2)}; w = ${w.toExponential(3)}, b = ${b.toExponential(5)}`);
            }
            i++;
        }


        return { w, b, J, h, i };
    };