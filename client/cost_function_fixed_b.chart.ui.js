// const calculate_J_for_fixed_b = (b, b_vector, J_matrix) => {
//   const b_col_index = b_vector.indexOf(b);

//   if (!b_col_index) {
//       throw new Error(`Unable to find value the specified "b": ${b}. ` +
//           `Please ensure that the "b" value is present in the cost function "b" vector.`);
//   }

//   const J_fixed_b = get_matrix_col(J_matrix, b_col_index);

//   if (!J_fixed_b || J_fixed_b.length === 0) {
//       throw new Error(`Unable to find "J" vector for the specified for "b": ${b}. ` +
//           `Please ensure that "J" matrix is consistent with "b" vector.`);
//   }

//   return J_fixed_b;
// };


const plot_linear_regression_cost_function_fixed_b = (
  chartId,
  cost_function_fixed_b,
  actual_cost
) => {

  // const {w: w_vector, b: b_vector, J: J_matrix} = cost_function_points;

  // const J_fixed_b = calculate_J_for_fixed_b(b, b_vector, J_matrix);

  const {w: w_vector, J: J_fixed_b_vector} = cost_function_fixed_b;

  const cost_function_chart_data = {
    name: "Cost Function",
    x: w_vector,
    y: J_fixed_b_vector,
    mode: "lines",
    type: "scatter",
    marker: {
      color: "green",
      symbol: "x",
    },
  };

  const actual_cost_chart_data = {
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

  const data = [cost_function_chart_data, actual_cost_chart_data];

  const layout = {
    title: "Cost Function (fixed b)",
    xaxis: { title: "w" },
    // yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
    yaxis: { title: "J"},
  };

  Plotly.newPlot(chartId, data, layout);
};