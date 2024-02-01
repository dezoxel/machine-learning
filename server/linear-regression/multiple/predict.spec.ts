import { beforeEach, describe, expect, it } from 'vitest'
import { vector_from_array } from '../../platform/math';
import { multiple_linear_regression_model } from './domain/model';
import { get_multiple_regression_training_set } from './infrastructure/training-set.data';

interface Ctx {
    features: number[][];
    targets: number[];
}

describe('predict', () => {
    beforeEach<Ctx>(async (context) => {
        const { features, targets } = await get_multiple_regression_training_set();
        context.features = features;
        context.targets = targets;
    });

    it<Ctx>('predicts ok', async ({ features, targets }) => {
        const b_init = 785.1811367994083;
        const w_init = vector_from_array([0.39133535, 18.75376741, -53.36032453, -26.42131618]);
        const model = multiple_linear_regression_model(w_init, b_init);

        const first_training_example_features = features[0];
        const first_training_example_target = targets[0];

        const expected_price = first_training_example_target;

        const y_hat = model(first_training_example_features);

        const e = 0.0001;
        expect((expected_price - y_hat) < e).toBe(true);
    });
});
