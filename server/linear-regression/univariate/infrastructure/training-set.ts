import { load_csv_numbers } from "../../../platform/load-csv-numbers";

export interface Univariate_Linear_Regression_Training_Set {
    x: number[];
    y: number[];
}

/** 
 * Training set for univariate linear regression
 * 
 * Features:
 * - area (square feet)
 *
 * Example:
 * [2104, 1416, 852]
 * 
 * Targets:
 * - price (dollars)
 * 
 * Example:
 * [460, 232, 178]
 */
export const get_univariate_linear_regression_training_set = async (): Promise<Univariate_Linear_Regression_Training_Set> => {
    const training_set = await load_csv_numbers('./data/houses.csv');

    const x = training_set.map(row => row[0]);
    const y = training_set.map(row => row[4]);

    // const x = [1, 2];
    // const y = [3, 5];

    return { x, y };
};