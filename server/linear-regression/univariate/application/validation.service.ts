export const get_number_from_query_string_factory = <T extends { [K in keyof T]: string }>(query: T) => (key: keyof T): number => {
    const param = query[key];

    if (!param) {
        throw new Error(`Missing query param. Key: ${String(key)}`);
    }

    const value = parseFloat(param);

    if (isNaN(value)) {
        throw new Error(`Query param is not number. Key: ${String(key)}, Value: ${value}`);
    }

    return value;
}

export const get_string_from_query_string_factory = <T extends { [K in keyof T]: string }>(query: T) => (key: keyof T): string => {
    const param = query[key];

    if (!param || param === '') {
        throw new Error(`Missing query param. Key: ${String(key)}`);
    }

    return param;
}

export const get_option_from_query_string_factory = <T extends { [K in keyof T]: string }>(query: T) => (key: keyof T, options: string[]): string => {
    const param = query[key];

    const is_valid_option = options.includes(param);

    if (!is_valid_option) {
        throw new Error(`Invalid query param. Key: ${String(key)}, Value: ${param}`);
    }

    return param;
}