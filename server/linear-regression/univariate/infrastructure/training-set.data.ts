import { TrainingSet } from "./training-set.types";

// w = 2, b = 0
// TODO: make configurable thru UI
// const trainingSetFeatures = [0, 1, 2];
// const trainingSetTargets = [0, 1, 2];
const trainingSetFeatures = [1.0, 2.0];
const trainingSetTargets = [300.0, 500.0];

const trainingSet: TrainingSet = {
    features: trainingSetFeatures,
    targets: trainingSetTargets
};

export const getTrainingSet = async (): Promise<TrainingSet> => {
    return trainingSet;
}

