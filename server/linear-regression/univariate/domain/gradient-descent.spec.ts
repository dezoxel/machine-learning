import { beforeEach, describe, expect, it } from 'vitest';
import { mean_squared_error_for_univariate_linear_regression } from './cost-function';
import { gradient_descent_for_univariate_linear_regression, gradient_function_for_univariate_linear_regression } from './gradient-descent';
import { univariate_linear_regression_model } from './model';

interface Ctx {
    x: number[];
    y: number[];

    expected_w: number;
    expected_b: number;
}

describe('gradient_descent', () => {
    beforeEach<Ctx>(async (context) => {
        context.x = [1, 2];
        context.y = [3, 5];
        context.expected_w = 2;
        context.expected_b = 1;
    });

    it<Ctx>('params ok', ({ x, y, expected_w, expected_b }) => {
        const J_precision = 0.000001;
        const max_iterations = 10000;
        const alpha = 0.01;
        const initial_w = 0;
        const initial_b = 0;
        const { w, b } = gradient_descent_for_univariate_linear_regression(
            J_precision, max_iterations, alpha, initial_w, initial_b, x, y,
            mean_squared_error_for_univariate_linear_regression,
            gradient_function_for_univariate_linear_regression,
            { print_results_every_n_iterations: 1000 }
        );

        const eps = 0.01;
        expect(Math.abs(expected_w - w) < eps).toBe(true);
        expect(Math.abs(expected_b - b) < eps).toBe(true);

        for (let i = 0; i < x.length; i++) {
            const y_hat = univariate_linear_regression_model(w, b, x[i]);

            expect(Math.abs(y[i] - y_hat) < eps).toBe(true);
        }
    });
});
