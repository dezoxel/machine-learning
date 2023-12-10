export const create_vector_from_range = (begin: number, end: number, step: number) => {
    const vector: number[] = [];
    for (let i = begin; i <= end; i += step) {
        vector.push(i);
    }
    return vector;
}
