function get_training_set_endpoint (host) {
    const path = "/linear-regression/multiple/training-set";

    const url = build_url(path, host);

    return url;
};
