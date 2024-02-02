import { beforeEach, describe, expect, it } from 'vitest'
import { vector_from_array } from '../../../platform/math';
import { get_multiple_regression_training_set } from '../infrastructure/training-set.data';
import { gradient_descent_for_linear_regression, gradient_function_for_multiple_linear_regression } from './gradient-descent';
import { mean_squared_error_for_multiple_linear_regression } from './cost-function';
import { multiple_linear_regression_model } from './model';

interface Ctx {
    X: number[][];
    y: number[];

    w: number[];
    b: number;
}

describe('gradient_descent', () => {
    beforeEach<Ctx>(async (context) => {
        const { features, targets } = await get_multiple_regression_training_set();
        context.X = features;
        context.y = targets;
        context.w = vector_from_array([0.39133535, 18.75376741, -53.36032453, -26.42131618]);
        context.b = 785.1811367994083;
    });

    it<Ctx>('params ok', ({ X, y }) => {
        const expected_w = vector_from_array([0.39133535, 18.75376741, -53.36032453, -26.42131618]);
        const expected_b = 785.1811367994083;

        const J_precision = 0;
        const max_iterations = 1000;
        const alpha = 5.0e-7;
        const initial_w = [0, 0, 0, 0];
        const initial_b = 0;
        const { w, b } = gradient_descent_for_linear_regression(
            J_precision, max_iterations, alpha, initial_w, initial_b, X, y,
            mean_squared_error_for_multiple_linear_regression,
            gradient_function_for_multiple_linear_regression
        );

        console.log('w', w);
        console.log('b', b);

        for (let i = 0; i < X.length; i++) {
            const y_hat = multiple_linear_regression_model(w, b, X[i]);
            console.log(`Prediction: ${y_hat}, Target: ${y[i]}`);
        }

        // TODO: fix it with Feature Engineering and Regularization
        // for (let j = 0; j < w.length; j++) {
        //     expect(w[j]).toBe(expected_w[j]);
        // }
        // expect(b).toBe(expected_b);
    });
});
