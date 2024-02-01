import { Univariate_Linear_Regression_Training_Set } from "./training-set.types";

// w = 2, b = 0
// TODO: make configurable thru UI
// const trainingSetFeatures = [0, 1, 2];
// const trainingSetTargets = [0, 1, 2];
const trainingSetFeatures = [1.0, 2.0];
const trainingSetTargets = [300.0, 500.0];

export const get_univariate_linear_regression_training_set = async (): Promise<Univariate_Linear_Regression_Training_Set> => {
    return {
        features: trainingSetFeatures,
        targets: trainingSetTargets
    };
}