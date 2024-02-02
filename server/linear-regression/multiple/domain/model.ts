import { vector_dot_product } from "../../../platform/math";

export type Multiple_Linear_Regression_Model = (w: number[], b: number, x: number[]) => number;
export const multiple_linear_regression_model: Multiple_Linear_Regression_Model =
    (w, b, x) =>
        vector_dot_product(w, x) + b;