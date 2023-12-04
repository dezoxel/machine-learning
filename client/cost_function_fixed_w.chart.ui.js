const calculate_J_for_fixed_w = (w, w_vector, J_matrix) => {
    const w_row_index = w_vector.indexOf(w);

    if (!w_row_index) {
        throw new Error(`Unable to find value the specified "w": ${w}. ` +
            `Please ensure that the "w" value is present in the cost function "w" vector.`);
    }

    const J_fixed_w = get_matrix_row(J_matrix, w_row_index);

    if (!J_fixed_w || J_fixed_w.length === 0) {
        throw new Error(`Unable to find "J" vector for the specified for "w": ${w}. ` +
            `Please ensure that "J" matrix is consistent with "w" vector.`);
    }

    return J_fixed_w;
};

const plot_linear_regression_cost_function_fixed_w = (
    chartId,
    w,
    cost_function_points,
    actual_cost
) => {
    const {w: w_vector, b: b_vector, J: J_matrix} = cost_function_points;

    const J_fixed_w = calculate_J_for_fixed_w(w, w_vector, J_matrix);

    const cost_function_chart_data = {
        name: "Cost Function",
        x: b_vector,
        y: J_fixed_w,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "green",
            symbol: "x",
        },
    };

    const actual_cost_chart_data = {
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

    const data = [cost_function_chart_data, actual_cost_chart_data];

    const layout = {
        title: "Cost Function (fixed w)",
        xaxis: { title: "b" },
        yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
    };

    Plotly.newPlot(chartId, data, layout);
};