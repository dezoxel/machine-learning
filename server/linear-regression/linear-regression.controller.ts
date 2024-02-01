import { Router } from 'express';
import { multiple_linear_regression_controller } from './multiple/application/linear-regression.controller';
import { univariate_linear_regression_controller } from './univariate/application/linear-regression.controller';

export const linear_regression_controller = Router();

linear_regression_controller.use('/univariate', univariate_linear_regression_controller);
linear_regression_controller.use('/multiple', multiple_linear_regression_controller);