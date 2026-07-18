import { Router } from 'express';

import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Comment, { validateComment } from '../../models/Comment.js';
import Post from '../../models/Post.js';
import Notification from '../../models/Notification.js';

const router = Router();

router.post('/', requireJwtAuth, async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const post = await Post.findById(req.body.post);
    if (!post) return res.status(404).json({ message: 'No such post.' });

    const comment = new Comment({
      content: req.body.content,
      user: req.user.id,
      post: req.body.post,
    });

    await comment.save();
    await comment.populate('user');

    post.comments.push(comment.id);
    await post.save();

    const notification = new Notification({
      user: post.user,
      type: 'comment',
      message: `${req.user.username} commented on your post`,
      post: post.id,
      comment: comment.id,
    });
    await notification.save();

    res.status(201).json({ comment });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempComment = await Comment.findById(req.params.id);
    if (!tempComment) return res.status(404).json({ message: 'No such comment.' });
    if (!(tempComment.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to edit this comment.' });

    const { error } = validateComment(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedComment = await Comment.findByIdAndUpdate(tempComment.id, { content: req.body.content }, { new: true }).populate('user');
    res.status(200).json({ comment: updatedComment });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempComment = await Comment.findById(req.params.id);
    if (!tempComment) return res.status(404).json({ message: 'No such comment.' });
    if (!(tempComment.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to delete that comment.' });

    await Post.findByIdAndUpdate(tempComment.post, { $pull: { comments: tempComment.id } });
    const comment = await Comment.findByIdAndRemove(tempComment.id);
    res.status(200).json({ comment });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user');
    if (!comment) return res.status(404).json({ message: 'No comment found.' });
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: 'desc' }).populate('user');
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;