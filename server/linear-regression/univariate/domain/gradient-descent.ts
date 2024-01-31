import { Cost_Function } from "./cost_function";
import { linear_regression_model } from "./model";

export interface Gradient_Step_For_Linear_Regression {
    dj_dw: number;
    dj_db: number;
}
export const gradient_step_for_linear_regression = (x: number[], y: number[], w: number, b: number): Gradient_Step_For_Linear_Regression => {
    const m = x.length;
    let dj_dw = 0;
    let dj_db = 0;

    for (let i = 0; i < m; i++) {
        const f_wb = linear_regression_model(w, b)(x[i]);

        const dj_dw_i = (f_wb - y[i]) * x[i];
        const dj_db_i = f_wb - y[i];

        dj_dw += dj_dw_i;
        dj_db += dj_db_i;
    }

    dj_dw = dj_dw / m;
    dj_db = dj_db / m;

    return { dj_dw, dj_db };
};


export interface Gradient_Descent_For_Linear_Regression {
    w: number;
    b: number;
    J: number;
    J_history: number[];
    params_history: number[][];
    i: number;
}
export const gradient_descent_for_linear_regression = (suitable_J: number, max_iterations: number, alpha: number, initial_w: number, initial_b: number, x: number[], y: number[], cost_function: Cost_Function): Gradient_Descent_For_Linear_Regression => {
    let w = initial_w;
    let b = initial_b;
    let J = 1;
    const J_history: number[] = [];
    const params_history: number[][] = [];

    let i = 0;
    while (J > suitable_J && i < max_iterations) {
        const { dj_dw, dj_db } = gradient_step_for_linear_regression(x, y, w, b);
        w = w - alpha * dj_dw;
        b = b - alpha * dj_db;

        J = cost_function(linear_regression_model(w, b));
        J_history.push(J);

        if (i % 1000 === 0) {
            console.log(`Iteration ${i.toString().padStart(4, ' ')}: J = ${J.toExponential(2)}; w = ${w.toExponential(3)}, b = ${b.toExponential(5)}`);
        }

        if (i % 100 === 0) {
            console.log(`Iteration ${i.toString().padStart(4, ' ')}: J = ${J.toExponential(2)}; w = ${w.toExponential(3)}, b = ${b.toExponential(5)}`);
            params_history.push([w, b]);
        }
        i++;
    }


    return { w, b, J, J_history, params_history, i };
};