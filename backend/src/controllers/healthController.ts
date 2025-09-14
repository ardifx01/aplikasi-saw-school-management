import { Request, Response } from 'express';
import { database } from '@/config/database';
import { asyncHandler } from '@/middleware/errorHandler';
import { ApiStatus } from '@/types/enums';

export const getHealthCheck = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const dbStatus = database.getConnectionStatus();
  const isHealthy = database.isHealthy();

  res.status(isHealthy ? 200 : 503).json({
    success: true,
    data: {
      status: isHealthy ? ApiStatus.OK : ApiStatus.DEGRADED,
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    },
  });
});