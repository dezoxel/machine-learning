export type Univariate_Linear_Regression_Model_Function = (x: number) => number;

export const univariate_linear_regression_model = (w: number, b: number) => (x: number): number => w * x + b;