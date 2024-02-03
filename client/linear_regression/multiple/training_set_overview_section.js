function training_set_overview_section(training_set) {
    const { features: X, targets: y, feature_names } = training_set;
    const n = X[0].length;

    for (let j = 0; j < n; j++) {

        const jth_features = get_matrix_col(X, j)
        const chartId = `jth_feature_to_target-chart-${j}`;
        const feature_name = feature_names[j];

        plot_jth_feature_to_target_chart(
            chartId,
            j,
            jth_features,
            y,
            feature_name
        );
    }
}