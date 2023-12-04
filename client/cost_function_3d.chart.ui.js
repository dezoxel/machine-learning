const calculateW = (w_list, b_length) => {
    return w_list
        .map(w => Array(b_length).fill(w))
        .flat();
};

const calculateB = (b_list, w_length) => {
    return Array(w_length)
        .fill(0)
        .map(() => b_list)
        .flat();
};

const calculateJ = (J) => {
    return J.flat();
};


const plot_linear_regression_cost_function_3d = (
    chartId,
    cost_function_sample_range,
    actual_cost
) => {
    const { w: w_list, b: b_list } = cost_function_sample_range;

    const w = calculateW(w_list, b_list.length);
    const b = calculateB(b_list, w_list.length);
    const J = calculateJ(cost_function_sample_range.J);

    const cost_function_points = {
        name: "Cost Function",
        x: w,
        y: b,
        z: J,
        mode: "markers",
        type: "scatter3d",
        marker: {
            color: "green",
            size: 3
        },
    };

    const actual_cost_points = {
        name: "Actual Cost",
        x: [actual_cost.w],
        y: [actual_cost.b],
        z: [actual_cost.J],
        mode: "markers",
        type: "scatter3d",
        marker: {
            color: "blue",
        },
    };

    const data = [cost_function_points, actual_cost_points];

    const layout = {
        title: "Cost Function",
        scene: {
            xaxis: { title: "w" },
            yaxis: { title: "b", scaleanchor: "x", scaleratio: 1 },
            zaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
            camera: {
                eye: { x: -1.25, y: 1.25, z: 1.25 },
                up: { x: 0, y: 0, z: 1 },
                center: { x: 0, y: 0, z: 0 },
            },
        },
    };

    Plotly.newPlot(chartId, data, layout);
};