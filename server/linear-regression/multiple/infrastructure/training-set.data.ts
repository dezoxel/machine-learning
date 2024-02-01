import { matrix_from_arrays, vector_from_array } from "../../../platform/math";
import { Multiple_Linear_Regression_Training_Set } from "./training-set.types";

/**
// TODO: make configurable thru UI
 * Training set features for multiple linear regression
 * 
 * Features:
 * - area (square feet)
 * - number of bedrooms
 * - number of bathrooms
 * - age (years)
 */
const X_train = matrix_from_arrays([
    [2104, 5, 1, 45],
    [1416, 3, 2, 40],
    [852, 2, 1, 35]
]);

// TODO: make configurable thru UI
/**
 * Training set targets for multiple linear regression
 * 
 * Targets:
 * - price (dollars)
 */
const y_train = vector_from_array([
    460,
    232,
    315
]);

export const get_multiple_regression_training_set = async (): Promise<Multiple_Linear_Regression_Training_Set> => {
    return {
        features: X_train,
        targets: y_train
    };
}
