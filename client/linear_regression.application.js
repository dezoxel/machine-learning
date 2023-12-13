const linear_regression_app_train = (config) => {
    const { host, cost_function_name, max_iterations, initial_w, initial_b, learning_rate } = config;

    const train_endpoint =
        get_train_endpoint(
            host,
            max_iterations, initial_w, initial_b, learning_rate,
            cost_function_name
        );

    fetch(train_endpoint.href)
        .then(handle_non_ok_response)
        .then(({ w, b, J, J_history, i }) => {
            const w_input = document.getElementById("w_input");
            w_input.value = w;
            w_input.dispatchEvent(new Event("input", { bubbles: true }));

            const b_input = document.getElementById("b_input");
            b_input.value = b;
            b_input.dispatchEvent(new Event("input", { bubbles: true }));
            document.getElementById("linear_regression_train_cost").value = J;

            // TODO: Extract to config?
            const begin_range = [0, Math.floor(i * 0.01)];
            const end_range = [Math.floor(i * 0.3), i];

            plot_cost_by_iterations('linear_regression_cost_by_iteration_begin', J_history, begin_range, 'Cost by Iterations (begin)');
            plot_cost_by_iterations('linear_regression_cost_by_iteration_end', J_history, end_range, 'Cost by Iterations (end)');

        })
        .catch(handle_error);
};

const linear_regression_app = (config) => {
    const { host, w, b, w_begin, w_end, w_step, b_begin, b_end, b_step, cost_function_name } = config;

    const training_set_endpoint = get_training_set_endpoint(host);

    const predictions_by_features_endpoint =
        get_predictions_by_features_endpoint(host, w, b);

    const cost_function_by_wb_range_endpoint =
        get_cost_function_by_wb_range_endpoint(
            host,
            w_begin, w_end, w_step, b_begin, b_end, b_step,
            cost_function_name
        );

    const cost_function_range_fixed_w_endpoint =
        get_cost_function_range_fixed_w_endpoint(
            host,
            w,
            b_begin, b_end, b_step,
            cost_function_name
        );

    const cost_function_range_fixed_b_endpoint =
        get_cost_function_range_fixed_b_endpoint(
            host,
            b,
            w_begin, w_end, w_step,
            cost_function_name
        );

    const cost_function_by_wb_endpoint = get_cost_function_by_wb_endpoint(
        host,
        w,
        b,
        cost_function_name
    );

    Promise.all([
        fetch(training_set_endpoint.href),
        fetch(predictions_by_features_endpoint.href),
        fetch(cost_function_by_wb_range_endpoint.href),
        fetch(cost_function_range_fixed_w_endpoint.href),
        fetch(cost_function_range_fixed_b_endpoint.href),
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
                cost_function_fixed_w,
                cost_function_fixed_b,
                actual_cost,
            ]) => {
                plot_linear_regression(
                    "linear_regression",
                    training_set,
                    predictions_by_features.predictions
                );

                plot_linear_regression_cost_function_fixed_w(
                    "linear_regression_cost_function_fixed_w",
                    cost_function_fixed_w,
                    actual_cost
                );

                plot_linear_regression_cost_function_fixed_b(
                    "linear_regression_cost_function_fixed_b",
                    cost_function_fixed_b,
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