import cors from 'cors';
import express from 'express';

import { univariate_linear_regression_controller } from './linear-regression/univariate/application/linear-regression.controller';
import { global_error_handler } from './platform/global-error-handler';
import { status_endpoint_handler } from './platform/status-endpoint-handler';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', status_endpoint_handler);

app.use(global_error_handler());

app.use('/linear-regression/univariate', univariate_linear_regression_controller);
// TODO: Add routes for multivariate linear regression
// app.use('/linear-regression/multiple', linear_regression_routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
