import { config } from '@/config/environment';
import { database } from '@/config/database';
import { logger } from '@/utils/logger';
import { gracefulShutdown } from '@/services/gracefulShutdown';
import { createApp } from '@/app';

const start = async (): Promise<void> => {
  try {
    logger.info('Starting School Management System API...');

    // Connect to database
    await database.connect();

    // Create Express application
    const app = createApp();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`Health check endpoint: http://localhost:${config.port}/api/v1/health`);
      logger.info('Press Ctrl+C to stop the server gracefully');
    });

    // Setup graceful shutdown
    gracefulShutdown.setServer(server);

    server.on('close', () => {
      logger.info('Express server closed');
    });

  } catch (error: any) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();