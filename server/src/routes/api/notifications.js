import { Router } from 'express';

import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Notification from '../../models/Notification.js';

const router = Router();

router.put('/:id/read', requireJwtAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'No such notification.' });
    if (notification.user.toString() !== req.user.id)
      return res.status(400).json({ message: 'You do not have privileges to modify this notification.' });

    notification.read = true;
    await notification.save();
    res.status(200).json({ notification });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/read-all', requireJwtAuth, async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    res.status(200).json({ message: 'All notifications marked as read.' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'No such notification.' });
    if (notification.user.toString() !== req.user.id)
      return res.status(400).json({ message: 'You do not have privileges to delete this notification.' });

    await Notification.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Notification deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: 'desc' }).populate('post');
    const unreadCount = await Notification.countDocuments({ user: req.user.id, read: false });
    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;