const plot_jth_feature_to_target_chart = (chartId, j, jth_features, y, feature_name) => {
    const points = {
        name: `Features (j=${j})`,
        x: jth_features,
        y: y,
        mode: "markers",
        type: "scatter",
        marker: {
            color: "red",
            symbol: "x",
        },
    };

    const data = [points];

    const layout = {
        title: `Training Feature to Target (j=${j})`,
        xaxis: { title: `${feature_name}` },
        // yaxis: { title: "Y Axis", scaleanchor: "x", scaleratio: 1 },
        yaxis: { title: "Price" },
    };

    Plotly.newPlot(chartId, data, layout);
};