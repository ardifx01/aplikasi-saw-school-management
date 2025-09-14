import { Server } from 'http';
import { database } from '@/config/database';
import { logger } from '@/utils/logger';

class GracefulShutdownService {
  private server: Server | null = null;
  private isShuttingDown: boolean = false;

  public setServer(server: Server): void {
    this.server = server;
    this.setupSignalHandlers();
  }

  private setupSignalHandlers(): void {
    process.on('SIGTERM', this.handleShutdown.bind(this));
    process.on('SIGINT', this.handleShutdown.bind(this));
    process.on('uncaughtException', this.handleUncaughtException.bind(this));
    process.on('unhandledRejection', this.handleUnhandledRejection.bind(this));
  }

  private async handleShutdown(): Promise<void> {
    if (this.isShuttingDown) {
      logger.warn('Shutdown signal received, but shutdown already in progress');
      return;
    }

    this.isShuttingDown = true;
    logger.info('Received shutdown signal, starting graceful shutdown...');

    try {
      await this.closeServer();
      await this.closeDatabaseConnection();
      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error: any) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  }

  private async closeServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        resolve();
        return;
      }

      logger.info('Closing HTTP server...');
      this.server.close((error) => {
        if (error) {
          logger.error('Error closing HTTP server:', error);
          reject(error);
        } else {
          logger.info('HTTP server closed');
          resolve();
        }
      });
    });
  }

  private async closeDatabaseConnection(): Promise<void> {
    try {
      await database.disconnect();
    } catch (error) {
      logger.error('Error closing database connection:', error);
      throw error;
    }
  }

  private handleUncaughtException(error: Error): void {
    logger.error('Uncaught Exception:', error);
    this.handleShutdown();
  }

  private handleUnhandledRejection(reason: any, promise: Promise<any>): void {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    this.handleShutdown();
  }
}

export const gracefulShutdown = new GracefulShutdownService();