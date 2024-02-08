import { Cost_Function_For_Univariate_Linear_Regression, mean_absolute_error_for_univariate_linear_regression, mean_squared_error_for_univariate_linear_regression } from "../domain/cost-function";

export const get_cost_function_by_name = (name: string): Cost_Function_For_Univariate_Linear_Regression => {
    switch (name) {
        case 'mean_squared_error':
            return mean_squared_error_for_univariate_linear_regression;
        case 'mean_absolute_error':
            return mean_absolute_error_for_univariate_linear_regression;
        default:
            throw new Error(`Unknown cost function name: ${name}`);
    }
}