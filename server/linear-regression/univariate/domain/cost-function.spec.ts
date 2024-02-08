import { beforeEach, describe, expect, it } from 'vitest';
import { mean_squared_error_for_univariate_linear_regression } from './cost-function';

interface Ctx {
    x: number[];
    y: number[];

    w: number;
    b: number;
}

describe('cost_function', () => {
    beforeEach<Ctx>(async (context) => {
        context.x = [1, 2];
        context.y = [3, 5];
        context.w = 2;
        context.b = 1;
    });

    it<Ctx>('calcs ok', ({ x, y, w, b }) => {
        const expected_cost = 0.0;

        const cost = mean_squared_error_for_univariate_linear_regression(x, y, w, b);

        const precision = 0.0001;
        expect(Math.abs(expected_cost - cost) < precision).toBe(true);
    });
});
