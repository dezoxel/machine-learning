// TODO: avoid global vars
let training_set;
const init_app = () => {
    const host = get_env_var('api_host');

    const training_set_endpoint = get_training_set_endpoint(host);

    fetch(training_set_endpoint.href)
        .then(handle_non_ok_response)
        .then(training_set_response => {
            const { x, y } = training_set_response;
            training_set = training_set_response;
            const y_hat = [];
            const chart_id = "training_set_vs_prediction";

            plot_training_set_vs_prediction_chart(chart_id, x, y, y_hat);
        })
        .catch(handle_error);
};

const train_app = () => {
    const host = get_env_var('api_host');

    const max_iterations = get_number_input_value("train_max_iterations");
    const learning_rate = get_number_input_value("train_learning_rate");
    const initial_w = get_number_from_html("train_initial_w");
    const initial_b = get_number_from_html("train_initial_b");

    const cost_function_name = get_string_input_value("cost_function_name");

    const train_endpoint =
        get_train_endpoint(
            host,
            max_iterations, initial_w, initial_b, learning_rate,
            cost_function_name
        );

    fetch(train_endpoint.href)
        .then(handle_non_ok_response)
        .then(train_response => {
            const { w, b, J, i, h } = train_response;
            train_history = h;

            set_number_to_html("J", J);
            set_number_to_html("w", w);
            set_number_to_html("b", b);

            const J_history = h.map(record => record.J);

            // TODO: extract magic numbers to config
            const begin_range = [0, Math.floor(i * 0.05)];
            const end_range = [Math.floor(i * 0.3), i];
            plot_cost_by_iterations('cost_by_iteration_begin', J_history, begin_range, 'Cost by Iterations (begin)');
            plot_cost_by_iterations('cost_by_iteration_end', J_history, end_range, 'Cost by Iterations (end)');

            return train_response;
        })
        .then(train_response => {
            const { w, b, J } = train_response;

            // TODO: extract magic numbers to config
            const w_begin = w > 0 ? 0 : w * 2;
            const w_end = w > 0 ? w * 2 : 0;
            const w_step = (w_end - w_begin) / 50;

            const b_begin = b > 0 ? 0 : b * 2;
            const b_end = b > 0 ? b * 2 : 0;
            const b_step = (b_end - b_begin) / 50;

            const cost_function_by_wb_range_endpoint =
                get_cost_function_by_wb_range_endpoint(
                    host,
                    w_begin, w_end, w_step, b_begin, b_end, b_step,
                    cost_function_name
                );

            fetch(cost_function_by_wb_range_endpoint.href)
                .then(handle_non_ok_response)
                .then(cost_range_wb_response => {
                    const actual_cost = { w, b, J };

                    const chart_id = "cost_function_wb";
                    plot_linear_regression_cost_function_wb(chart_id, cost_range_wb_response, actual_cost);
                })
                .catch(handle_error);

            return train_response;
        })
        .then(train_response => {
            const { w, b, J, h } = train_response;

            // TODO: extract magic numbers to config
            const b_begin = b > 0 ? 0 : b * 3;
            const b_end = b > 0 ? b * 3 : 0;
            const b_step = (b_end - b_begin) / 50;

            const cost_function_range_fixed_w_endpoint =
                get_cost_function_range_fixed_w_endpoint(
                    host,
                    w,
                    b_begin, b_end, b_step,
                    cost_function_name
                );

            fetch(cost_function_range_fixed_w_endpoint.href)
                .then(handle_non_ok_response)
                .then(cost_range_fixed_w_response => {
                    const actual_cost = { w, b, J };

                    const chart_id = "cost_function_fixed_w";
                    plot_linear_regression_cost_function_fixed_w(chart_id, cost_range_fixed_w_response, actual_cost, h);
                })
                .catch(handle_error);

            return train_response;
        })
        .then(train_response => {
            const { w, b, J, h } = train_response;

            // TODO: extract magic numbers to config
            const w_begin = w > 0 ? 0 : w * 3;
            const w_end = w > 0 ? w * 3 : 0;
            const w_step = (w_end - w_begin) / 50;

            const cost_function_range_fixed_b_endpoint =
                get_cost_function_range_fixed_b_endpoint(
                    host,
                    b,
                    w_begin, w_end, w_step,
                    cost_function_name
                );

            fetch(cost_function_range_fixed_b_endpoint.href)
                .then(handle_non_ok_response)
                .then(cost_range_fixed_b_response => {
                    const actual_cost = { w, b, J };

                    const chart_id = "cost_function_fixed_b";
                    plot_linear_regression_cost_function_fixed_b(chart_id, cost_range_fixed_b_response, actual_cost, h);
                })
                .catch(handle_error);
        })
        .catch(handle_error);
};

let timerId = null;
const visualize_train_app = () => {
    const h = [...params_history];

    timerId = setInterval(() => {
        if (h.length === 0) {
            clearTimeout(timerId);
            return;
        }

        const [w, b] = h.shift();

        const w_input = document.getElementById("w_input");
        w_input.value = w;
        w_input.dispatchEvent(new Event("input", { bubbles: true }));

        const b_input = document.getElementById("b_input");
        b_input.value = b;
        b_input.dispatchEvent(new Event("input", { bubbles: true }));

    }, 500);
};

const visualize_train_stop_app = () => {
    clearTimeout(timerId);
}

const predict_app = () => {
    const host = get_env_var('api_host');

    const w = get_number_from_html("w");
    const b = get_number_from_html("b");

    const predictions_by_features_endpoint =
        get_predictions_by_features_endpoint(host, w, b);

    fetch(predictions_by_features_endpoint.href)
        .then(handle_non_ok_response)
        .then(predictions_by_features_response => {
            const { x, y } = training_set;
            const y_hat = predictions_by_features_response.y_hat;

            const chart_id = "training_set_vs_prediction";
            plot_training_set_vs_prediction_chart(chart_id, x, y, y_hat);
        }
        )
        .catch(handle_error);
};


