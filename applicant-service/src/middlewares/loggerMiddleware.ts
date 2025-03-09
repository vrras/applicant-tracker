import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, body } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    logger.info(`${method} ${originalUrl} ${JSON.stringify(body)} ${statusCode} - ${duration}ms`);
  });

  next();
};

export default loggerMiddleware;
