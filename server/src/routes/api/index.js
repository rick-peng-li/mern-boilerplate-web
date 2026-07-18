import { Router } from 'express';
import usersRoutes from './users.js';
import messagesRoutes from './messages.js';
import postsRoutes from './posts.js';
import commentsRoutes from './comments.js';
import notificationsRoutes from './notifications.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);
router.use('/notifications', notificationsRoutes);

export default router;