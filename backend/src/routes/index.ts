import { Router } from 'express';
import healthRoutes from './healthRoutes';
import apiRoutes from './apiRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/', apiRoutes);
router.use('/health', healthRoutes);
router.use('/users', userRoutes);

export default router;