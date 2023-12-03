const plot_linear_regression_cost_function_3d = (
    cost_function_sample_range,
    actual_cost
) => {
    const w_list = cost_function_sample_range.w;
    const b_list = cost_function_sample_range.b;

    const w_length = w_list.length;
    const b_length = b_list.length;

    const w = w_list
        .map((w) => {
            const arr = Array(b_length).fill(w);
            return arr;
        })
        .flat();

    const b = Array(w_length)
        .fill(0)
        .map(() => cost_function_sample_range.b)
        .flat();
    const J = cost_function_sample_range.J.flat();

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
                // eye: { x: 1.25, y: 1.25, z: 1.25 }, // Adjust these values to change the perspective
                eye: { x: -1.25, y: 1.25, z: 1.25 }, // Adjust these values to change the perspective
                up: { x: 0, y: 0, z: 1 }, // Usually, Z is up
                center: { x: 0, y: 0, z: 0 }, // Center of the scene
            },
        },
    };

    Plotly.newPlot("linear_regression_cost_function_3d", data, layout);
};