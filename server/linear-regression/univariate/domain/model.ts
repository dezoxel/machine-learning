export type Univariate_Linear_Regression_Model = (w: number, b: number, x: number) => number;
export const univariate_linear_regression_model: Univariate_Linear_Regression_Model =
    (w, b, x) => w * x + b;