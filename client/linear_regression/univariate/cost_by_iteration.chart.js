const calc_x_and_y_points = (J_vector, range) => {
    const range_size = range[1] - range[0];
    const J_points = J_vector.slice(range[0], range[1]);
    const iterations_points = new Array(range_size).fill(0).map((_, i) => range[0] + i);

    return { iterations_points, J_points };
}

const plot_cost_by_iterations = (chartId, J_vector, range, title) => {
    const { iterations_points, J_points } = calc_x_and_y_points(J_vector, range);

    const J_chart_data = {
        name: "Cost",
        x: iterations_points,
        y: J_points,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "green",
            symbol: "x",
        },
    };

    const data = [J_chart_data];

    const layout = {
        title,
        xaxis: { title: "iteration" },
        // yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
        yaxis: { title: "J" },
    };

    Plotly.newPlot(chartId, data, layout);
};