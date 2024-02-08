const plot_linear_regression_cost_function_fixed_b = (
  chart_id,
  cost_function_fixed_b,
  actual_cost,
  cost_history,
) => {

  const { w: w_vector, J: J_fixed_b_vector } = cost_function_fixed_b;

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

  const w = cost_history.map(record => record.w);
  const J = cost_history.map(record => record.J);

  const cost_history_chart_data = {
      name: "Cost History",
      x: w,
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
    title: "Cost Function (fixed b)",
    xaxis: { title: "w" },
    // yaxis: { title: "J", scaleanchor: "x", scaleratio: 1 },
    yaxis: { title: "J" },
  };

  Plotly.newPlot(chart_id, data, layout);
};