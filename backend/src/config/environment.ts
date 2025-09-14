import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  nodeEnv: string;
  logLevel: string;
  allowedOrigins: string[];
}

const validateEnvironment = (): void => {
  const requiredVars = ['MONGODB_URI'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

const createConfig = (): Config => {
  validateEnvironment();

  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ];

  return {
    port: parseInt(process.env.PORT || '4001', 10),
    mongoUri: process.env.MONGODB_URI!,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || defaultOrigins,
  };
};

export const config = createConfig();