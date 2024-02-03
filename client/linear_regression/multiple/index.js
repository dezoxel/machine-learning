const run_app = () => {
    const host = get_env_var('api_host');

    const config = {
        host,
    };
    multiple_linear_regression_app(config);
};

const bind_event_listeners = () => {
}

function main() {
    bind_event_listeners()
    run_app();
}

main();