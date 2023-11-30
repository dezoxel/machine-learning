// linear regression model
export const f_wb_x = (w: number, b: number) => (x: number) => w * x + b;

// mean squared cost function for linear regression
export const J_wb_x = (w: number, b: number) => (x: number[], y: number[]) => {
    const m = x.length;

    let sum = 0;
    for (let i = 0; i < m; i++) {
        const f_wb = f_wb_x(w, b);
        const y_hat_i = f_wb(x[i]);

        const error_i = Math.pow(y_hat_i - y[i], 2);
        sum += error_i;
    }

    const J = 1 / (2 * m) * sum;

    return J;
}

