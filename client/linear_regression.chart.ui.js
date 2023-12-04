const plot_linear_regression = (chartId, trainingSet, predictedTargets) => {
    const training_set_points = {
        name: "Training Set",
        x: trainingSet.features,
        y: trainingSet.targets,
        mode: "markers",
        type: "scatter",
        marker: {
            color: "red",
            symbol: "x",
        },
    };

    const prediction_points = {
        name: "Prediction",
        x: trainingSet.features,
        y: predictedTargets,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "blue",
            symbol: "x",
        },
    };

    const data = [training_set_points, prediction_points];

    const layout = {
        title: "Linear Regression",
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis", scaleanchor: "x", scaleratio: 1 },
    };

    Plotly.newPlot(chartId, data, layout);
};