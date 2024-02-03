const run_app = () => {
    const host = get_env_var('api_host');

    const w = get_number_input_value("w_input");
    const b = get_number_input_value("b_input");

    const w_begin = get_number_input_value("w_begin_input");
    const w_end = get_number_input_value("w_end_input");
    const w_step = get_number_input_value("w_step_input");

    const b_begin = get_number_input_value("b_begin_input");
    const b_end = get_number_input_value("b_end_input");
    const b_step = get_number_input_value("b_step_input");

    const cost_function_name = get_string_input_value("cost_function_name");

    const config = {
        host,

        w,
        b,

        w_begin,
        w_end,
        w_step,

        b_begin,
        b_end,
        b_step,

        cost_function_name,
    };
    univariate_linear_regression_app(config);
};

const run_train_app = () => {
    const host = get_env_var('api_host');

    const cost_function_name = get_string_input_value("cost_function_name");

    // train
    const max_iterations = get_number_input_value(
        "linear_regression_train_max_iterations"
    );
    const learning_rate = get_number_input_value(
        "linear_regression_train_learning_rate"
    );
    const initial_w = get_number_input_value(
        "linear_regression_train_initial_w"
    );
    const initial_b = get_number_input_value(
        "linear_regression_train_initial_b"
    );

    const config = {
        host,

        cost_function_name,

        max_iterations,
        learning_rate,
        initial_w,
        initial_b,
    };
    univariate_linear_regression_app_train(config);
};

const run_visualize_train_app = () => {
    univariate_linear_regression_app_visualize_train();
};
const run_stop_visualize_train_app = () => {
    univariate_linear_regression_app_visualize_train_stop();
};

const bind_event_listeners = () => {
    document.getElementById("w_input").addEventListener("input", run_app);
    document.getElementById("b_input").addEventListener("input", run_app);

    document.getElementById("w_begin_input").addEventListener("input", run_app);
    document.getElementById("w_end_input").addEventListener("input", run_app);
    document.getElementById("w_step_input").addEventListener("input", run_app);

    document.getElementById("b_begin_input").addEventListener("input", run_app);
    document.getElementById("b_end_input").addEventListener("input", run_app);
    document.getElementById("b_step_input").addEventListener("input", run_app);

    document.getElementById("cost_function_name").addEventListener("change", run_app);
    document.getElementById("linear_regression_train").addEventListener("click", run_train_app);
    document.getElementById("linear_regression_train_visualize").addEventListener("click", run_visualize_train_app);
    document.getElementById("linear_regression_train_visualize_stop").addEventListener("click", run_stop_visualize_train_app);
}

function main() {
    bind_event_listeners()
    run_app();
}

main();