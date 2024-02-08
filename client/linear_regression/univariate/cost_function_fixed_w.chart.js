const plot_linear_regression_cost_function_fixed_w = (
    chart_id,
    cost_function_fixed_w,
    actual_cost,
    cost_history,
) => {
    const {b: b_vector, J: J_fixed_w_vector} = cost_function_fixed_w;

    const cost_function_chart_data = {
        name: "Cost Function",
        x: b_vector,
        y: J_fixed_w_vector,
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

    const b = cost_history.map(record => record.b);
    const J = cost_history.map(record => record.J);

    const cost_history_chart_data = {
        name: "Cost History",
        x: b,
        y: J,
        mode: "lines",
        type: "scatter",
        marker: {
            color: "orange",
            symbol: "x",
        },
    };

    const data = [cost_function_chart_data, actual_cost_chart_data, cost_history_chart_data];

    const layout = {
        title: "Cost Function (fixed w)",
        xaxis: { title: "b" },
        // yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
        yaxis: { title: "J"},
    };

    Plotly.newPlot(chart_id, data, layout);
};