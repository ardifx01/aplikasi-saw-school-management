import mongoose from 'mongoose';
import { logger } from '@/utils/logger';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (this.isConnected) {
        logger.info('Database already connected');
        return;
      }

      logger.info('Attempting to connect to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI as string);
      this.isConnected = true;
      logger.info('Successfully connected to MongoDB');

      this.setupEventListeners();
    } catch (error: any) {
      logger.error('MongoDB connection error:', error.message);
      logger.info('Make sure MongoDB is running. You can start it with: npm run docker:up');
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (mongoose.connection.readyState !== 0) {
        logger.info('Closing MongoDB connection...');
        await mongoose.connection.close();
        this.isConnected = false;
        logger.info('MongoDB connection closed');
      }
    } catch (error: any) {
      logger.error('Error closing MongoDB connection:', error);
      throw error;
    }
  }

  public getConnectionStatus(): 'connected' | 'disconnected' {
    return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  }

  public isHealthy(): boolean {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  private setupEventListeners(): void {
    mongoose.connection.on('connected', () => {
      this.isConnected = true;
      logger.info('MongoDB connected');
    });

    mongoose.connection.on('disconnected', () => {
      this.isConnected = false;
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      this.isConnected = false;
      logger.error('MongoDB error:', error);
    });
  }
}

export const database = DatabaseConnection.getInstance();