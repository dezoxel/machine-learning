import { TrainingSet } from "./training-set.types.infrastructure";

const trainingSetFeatures = [0, 1, 3];
const trainingSetTargets = [1, 3, 7];

const trainingSet: TrainingSet = {
    features: trainingSetFeatures,
    targets: trainingSetTargets
};

export const getTrainingSet = async (): Promise<TrainingSet> => {
    return trainingSet;
}

