import { beforeEach, describe, expect, it } from 'vitest'
import { univariate_linear_regression_model } from './model';

interface Ctx {
    x: number[];
    y: number[];

    w: number;
    b: number;
}

describe('model', () => {
    beforeEach<Ctx>(async (context) => {
        context.x = [1, 2];
        context.y = [3, 5];
        context.w = 2;
        context.b = 1;
    });

    it<Ctx>('predicts ok', ({ x, y, w, b }) => {
        for (let i = 0; i < x.length; i++) {
            const y_hat = univariate_linear_regression_model(w, b, x[i]);

            const eps = 0.0001;
            expect(Math.abs(y[i] - y_hat) < eps).toBe(true);
        }
    });
});
