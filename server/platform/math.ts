export const vector_from_range = (begin: number, end: number, step: number): number[] => {
    const vector: number[] = [];
    for (let i = begin; i <= end; i += step) {
        vector.push(i);
    }
    return vector;
}

export const vector_from_array = (values: number[]): number[] => {
    return values;
}

export const matrix_from_arrays = (values: number[][]): number[][] => {
    return values;
}

export const vector_dot_product = (v1: number[], v2: number[]): number => {
    let result = 0;
    for (let i = 0; i < v1.length; i++) {
        result += v1[i] * v2[i];
    }
    return result;
}