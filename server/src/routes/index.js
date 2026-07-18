import { Router } from 'express';
import localAuthRoutes from './localAuth.js';
import googleAuthRoutes from './googleAuth.js';
import facebookAuthRoutes from './facebookAuth.js';
import apiRoutes from './api/index.js';

const router = Router();

router.use('/auth', localAuthRoutes);
router.use('/auth', googleAuthRoutes);
router.use('/auth', facebookAuthRoutes);
router.use('/api', apiRoutes);

router.use('/api', (req, res) => res.status(404).json({ message: 'No route for this path' }));

export default router;