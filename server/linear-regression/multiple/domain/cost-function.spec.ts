import { beforeEach, describe, expect, it } from 'vitest'
import { vector_from_array } from '../../../platform/math';
import { multiple_linear_regression_model } from './model';
import { get_multiple_regression_training_set } from '../infrastructure/training-set.data';
import { mean_squared_error } from './cost-function';

interface Ctx {
    X: number[][];
    y: number[];

    w: number[];
    b: number;
}

describe('cost_function', () => {
    beforeEach<Ctx>(async (context) => {
        const { features, targets } = await get_multiple_regression_training_set();
        context.X = features;
        context.y = targets;
        context.w = vector_from_array([0.39133535, 18.75376741, -53.36032453, -26.42131618]);
        context.b = 785.1811367994083;
    });

    it<Ctx>('calcs ok', ({X, y, w, b}) => {
        const expected_cost = 0.0;

        const model = multiple_linear_regression_model(w, b);
        const cost_function = mean_squared_error(X, y);
        const cost = cost_function(model);

        const e = 0.0001;
        expect((expected_cost - cost) < e).toBe(true);
    });
});
