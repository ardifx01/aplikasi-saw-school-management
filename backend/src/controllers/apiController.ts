import { Request, Response } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';

export const getApiInfo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    data: {
      message: 'School Management System API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  });
});