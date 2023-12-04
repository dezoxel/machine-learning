const linear_regression_app = (config) => {
    const { w, b, w_begin, w_end, w_step, b_begin, b_end, b_step, host } = config;

    const training_set_endpoint = get_training_set_endpoint(host);

    const predictions_by_features_endpoint =
        get_predictions_by_features_endpoint(host, w, b);

    const cost_function_by_wb_range_endpoint =
        get_cost_function_by_wb_range_endpoint(
            host,
            w_begin, w_end, w_step, b_begin, b_end, b_step
        );

    const cost_function_by_wb_endpoint = get_cost_function_by_wb_endpoint(
        host,
        w,
        b
    );

    Promise.all([
        fetch(training_set_endpoint.href),
        fetch(predictions_by_features_endpoint.href),
        fetch(cost_function_by_wb_range_endpoint.href),
        fetch(cost_function_by_wb_endpoint.href),
    ])
        .then((responses) =>
            Promise.all(responses.map(handle_non_ok_response))
        )
        .then(
            ([
                training_set,
                predictions_by_features,
                cost_function_sample_range,
                actual_cost,
            ]) => {
                plot_linear_regression(
                    "linear_regression",
                    training_set,
                    predictions_by_features.predictions
                );

                plot_linear_regression_cost_function_fixed_w(
                    "linear_regression_cost_function_fixed_w",
                    w,
                    cost_function_sample_range,
                    actual_cost
                );

                plot_linear_regression_cost_function_fixed_b(
                    "linear_regression_cost_function_fixed_b",
                    b,
                    cost_function_sample_range,
                    actual_cost
                );

                plot_linear_regression_cost_function_3d(
                    "linear_regression_cost_function_3d",
                    cost_function_sample_range,
                    actual_cost
                );
            }
        )
        .catch(handle_error);
};