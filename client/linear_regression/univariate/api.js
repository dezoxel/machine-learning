function get_training_set_endpoint (host) {
    const path = "/linear-regression/univariate/training-set";

    const url = build_url(path, host);

    return url;
};

function get_predictions_by_features_endpoint(host, w, b) {
    const params = { w, b };
    const path = "/linear-regression/univariate/predictions-by-features";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

function get_cost_function_by_wb_range_endpoint(host, w_begin, w_end, w_step, b_begin, b_end, b_step, cost_function_name) {
    const params = { w_begin, w_end, w_step, b_begin, b_end, b_step, cost_function_name };
    const path = "/linear-regression/univariate/cost-function-by-wb-range";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

function get_cost_function_range_fixed_w_endpoint(host, w, b_begin, b_end, b_step, cost_function_name) {
    const params = { w, b_begin, b_end, b_step, cost_function_name };
    const path = "/linear-regression/univariate/cost-function-range-fixed-w";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

function get_cost_function_range_fixed_b_endpoint(host, b, w_begin, w_end, w_step, cost_function_name) {
    const params = { b, w_begin, w_end, w_step, cost_function_name };
    const path = "/linear-regression/univariate/cost-function-range-fixed-b";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

function get_cost_function_by_wb_endpoint(host, w, b, cost_function_name) {
    const params = { w, b, cost_function_name };
    const path = "/linear-regression/univariate/cost-function-by-wb";

    const url = build_url_with_query_string(path, host, params);

    return url;
};

function get_train_endpoint(host, max_iterations, initial_w, initial_b, learning_rate, cost_function_name) {
    const params = {
        max_iterations,
        initial_w,
        initial_b,
        learning_rate,
        cost_function_name,
    };
    const path = "/linear-regression/univariate/train";

    const url = build_url_with_query_string(path, host, params);

    return url;
};
