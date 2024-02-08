const plot_training_set_vs_prediction_chart = (chartId, x, y, y_hat) => {
    const training_set_points = {
        name: "Training Set",
        x,
        y,
        mode: "markers",
        type: "scatter",
        marker: {
            color: "red",
            symbol: "x",
        },
    };

    const prediction_points = {
        name: "Prediction",
        x,
        y: y_hat,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "blue",
            symbol: "x",
        },
    };

    const data = [training_set_points, prediction_points];

    const layout = {
        title: "Training Set vs Prediction",
        xaxis: { title: "Size (sqft)" },
        // yaxis: { title: "Price", scaleanchor: "x", scaleratio: 1 },
        yaxis: { title: "Price" },
    };

    Plotly.newPlot(chartId, data, layout);
};