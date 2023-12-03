const get_training_set_endpoint = (host) => {
    const path = "/linear-regression/training-set";

    const url = build_url(path, host);

    return url;
};

const get_predictions_by_features_endpoint = (host, w, b) => {
    const params = { w, b };
    const path = "/linear-regression/predictions-by-features";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

const get_cost_function_by_wb_range_endpoint = (host, w, b) => {
    const params = { w, b };
    const path = "/linear-regression/cost-function-by-wb-range";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

const get_cost_function_by_wb_endpoint = (host, w, b) => {
    const params = { w, b };
    const path = "/linear-regression/cost-function-by-wb";

    const url = build_url_with_query_string(path, host, params);

    return url;
};