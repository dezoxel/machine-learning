const plot_linear_regression_cost_function_fixed_w = (
    w,
    cost_function_sample_range,
    actual_cost
) => {
    const w_row_index = cost_function_sample_range.w.indexOf(w);

    // TODO: add validations so that this issues is not possible
    if (!w_row_index) {
        throw new Error("w_row_index is not found");
    }

    const J_fixed_w = get_matrix_row(
        cost_function_sample_range.J,
        w_row_index
    );

    // TODO: add validations so that this issues is not possible
    if (!J_fixed_w || J_fixed_w.length === 0) {
        throw new Error("J_fixed_w is not found");
    }

    const cost_function_points = {
        name: "Cost Function",
        x: cost_function_sample_range.b,
        y: J_fixed_w,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "green",
            symbol: "x",
        },
    };

    const actual_cost_points = {
        name: "Actual Cost",
        x: [actual_cost.b],
        y: [actual_cost.J],
        mode: "markers",
        type: "scatter",
        marker: {
            color: "blue",
            symbol: "x",
        },
    };

    const data = [cost_function_points, actual_cost_points];

    const layout = {
        title: "Cost Function (fixed w)",
        xaxis: { title: "b" },
        yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
    };

    Plotly.newPlot("linear_regression_cost_function_fixed_w", data, layout);
};