import cors from 'cors';
import express from 'express';

import { linear_regression_controller } from './linear-regression/linear-regression.controller';
import { global_error_handler } from './platform/global-error-handler';
import { status_endpoint_handler } from './platform/status-endpoint-handler';

const app = express();
const port = 3000;

app.use(cors());

app.use(global_error_handler());

app.use('/linear-regression', linear_regression_controller);

app.get('/', status_endpoint_handler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
