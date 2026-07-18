import { Router } from 'express';

import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Message, { validateMessage } from '../../models/Message.js';

const router = Router();

router.post('/', requireJwtAuth, async (req, res) => {
  try {
    const { error } = validateMessage(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const message = new Message({
      text: req.body.text,
      user: req.user.id,
    });

    await message.save();
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await Message.findById(req.params.id);
    if (!tempMessage) return res.status(404).json({ message: 'No such message.' });
    if (!(tempMessage.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to edit this message.' });

    const { error } = validateMessage(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedMessage = await Message.findByIdAndUpdate(tempMessage.id, { text: req.body.text }, { new: true });
    res.status(200).json({ message: updatedMessage });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await Message.findById(req.params.id);
    if (!tempMessage) return res.status(404).json({ message: 'No such message.' });
    if (!(tempMessage.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to delete that message.' });

    const message = await Message.findByIdAndRemove(tempMessage.id);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 'desc' }).populate('user');
    res.json({
      messages: messages.map((m) => m.toJSON()),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;