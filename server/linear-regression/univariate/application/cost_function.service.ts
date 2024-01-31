import { Cost_Function, mean_absolute_error, mean_squared_error } from "../domain/cost_function";

export const get_cost_function_by_name = (name: string): (x: number[], y: number[]) => Cost_Function => {
    switch (name) {
        case 'mean_squared_error':
            return mean_squared_error;
        case 'mean_absolute_error':
            return mean_absolute_error;
        default:
            throw new Error(`Unknown cost function name: ${name}`);
    }
}