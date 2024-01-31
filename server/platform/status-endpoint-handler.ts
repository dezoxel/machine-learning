import { Request, Response } from 'express';

export const status_endpoint_handler = (_: Request, res: Response) => {
  res.json({ status: 'ok' });
};
