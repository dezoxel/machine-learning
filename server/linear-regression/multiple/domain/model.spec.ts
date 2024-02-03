import { beforeEach, describe, expect, it } from 'vitest'
import { vector_from_array } from '../../../platform/math';
import { multiple_linear_regression_model } from './model';
import { get_multiple_regression_training_set } from '../infrastructure/training-set.data';

interface Ctx {
    X: number[][];
    y: number[];

    w: number[];
    b: number;
}

describe('model', () => {
    beforeEach<Ctx>(async (context) => {
        const { features, targets } = await get_multiple_regression_training_set();
        context.X = features;
        context.y = targets;
        context.w = vector_from_array([0.39133535, 18.75376741, -53.36032453, -26.42131618]);
        context.b = 785.1811367994083;
    });

    it<Ctx>('predicts ok', ({ X, y, w, b }) => {
        const first_training_example_features = X[0];
        const first_training_example_target = y[0];

        const expected_price = first_training_example_target;

        const y_hat = multiple_linear_regression_model(w, b, first_training_example_features);

        const e = 0.0001;
        expect((expected_price - y_hat) < e).toBe(true);
    });
});
