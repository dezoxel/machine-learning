const multiple_linear_regression_app = (config) => {
    const { host } = config;

    const training_set_endpoint = get_training_set_endpoint(host);

    Promise.all([
        fetch(training_set_endpoint.href),
    ])
        .then((responses) =>
            Promise.all(responses.map(handle_non_ok_response))
        )
        .then(
            ([
                training_set,
            ]) => {
                training_set_overview_section(training_set);
            }
        )
        .catch(handle_error);
};

