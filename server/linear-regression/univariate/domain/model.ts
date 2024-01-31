export type Model_Function = (x: number) => number;

export const linear_regression_model = (w: number, b: number) => (x: number): number => w * x + b;