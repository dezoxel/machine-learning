export const linear_regression_model = (w: number, b: number) => (x: number) => w * x + b;

export type Model_Function = (x: number) => number;

export const mean_squared_error_cost_function = (x: number[], y: number[]) => (model: Model_Function) => {
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

// TODO: potentially we can make this function more generic by passing in the cost function and the model function as parameters
export const calc_cost_function_for_linear_regression_by_range = (w_vector: number[], b_vector: number[]) => (x: number[], y: number[]) => {
    const J_wb = w_vector.map((w) => {

        const J_fixed_w = b_vector.map((b) => {

            const model = linear_regression_model(w, b);
            const J = mean_squared_error_cost_function(x, y)(model);

            return Number(J.toPrecision(2));
        });

        return J_fixed_w;
    });

    return J_wb;
}

export const create_vector_from_range = (begin: number, end: number, step: number) => {
    const vector: number[] = [];
    for (let i = begin; i <= end; i += step) {
        vector.push(i);
    }
    return vector;
}