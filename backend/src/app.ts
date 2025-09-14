import express, { Application } from 'express';
import { config } from '@/config/environment';
import { corsMiddleware } from '@/config/cors';
import { requestLogger } from '@/middleware/requestLogger';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import routes from '@/routes';

export const createApp = (): Application => {
  const app: Application = express();

  // CORS middleware (must be first)
  app.use(corsMiddleware);

  // Global middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Routes
  app.use('/api/v1', routes);

  // Error handling middleware (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};