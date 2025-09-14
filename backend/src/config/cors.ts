import cors from 'cors';
import { config } from '@/config/environment';
import { logger } from '@/utils/logger';

interface CorsConfig {
  allowedOrigins: string[];
  credentials: boolean;
  optionsSuccessStatus: number;
}

const createCorsConfig = (): CorsConfig => {
  // Default allowed origins for development
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003'
  ];

  // In production, use environment variable or default to frontend URLs
  const allowedOrigins = config.nodeEnv === 'production'
    ? (process.env.ALLOWED_ORIGINS?.split(',') || defaultOrigins)
    : defaultOrigins;

  return {
    allowedOrigins,
    credentials: true, // Allow cookies and authorization headers
    optionsSuccessStatus: 200 // For legacy browser support
  };
};

const corsConfig = createCorsConfig();

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (corsConfig.allowedOrigins.includes(origin)) {
      logger.debug(`CORS: Allowing origin ${origin}`);
      callback(null, true);
    } else {
      logger.warn(`CORS: Blocking origin ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: corsConfig.credentials,
  optionsSuccessStatus: corsConfig.optionsSuccessStatus,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key'
  ],
  exposedHeaders: [
    'X-Total-Count',
    'X-Page-Count'
  ]
};

// Export configured CORS middleware
export const corsMiddleware = cors(corsOptions);

// Development-only: Log CORS configuration
if (config.nodeEnv === 'development') {
  logger.info('CORS Configuration:', {
    allowedOrigins: corsConfig.allowedOrigins,
    credentials: corsConfig.credentials
  });
}