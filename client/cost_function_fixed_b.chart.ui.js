const plot_linear_regression_cost_function_fixed_b = (
  b,
  cost_function_sample_range,
  actual_cost
) => {
  const b_col_index = cost_function_sample_range.b.indexOf(b);

  // TODO: add validations so that this issues is not possible
  if (!b_col_index) {
    throw new Error("b_col_index is not found");
  }

  const J_fixed_b = get_matrix_col(
    cost_function_sample_range.J,
    b_col_index
  );

  // TODO: add validations so that this issues is not possible
  if (!J_fixed_b || J_fixed_b.length === 0) {
    throw new Error("J_fixed_b is not found");
  }

  const cost_function_points = {
    name: "Cost Function",
    x: cost_function_sample_range.w,
    y: J_fixed_b,
    mode: "lines",
    type: "scatter",
    marker: {
      color: "green",
      symbol: "x",
    },
  };

  const actual_cost_points = {
    name: "Actual Cost",
    x: [actual_cost.w],
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
    title: "Cost Function (fixed b)",
    xaxis: { title: "w" },
    yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
  };

  Plotly.newPlot("linear_regression_cost_function_fixed_b", data, layout);
};