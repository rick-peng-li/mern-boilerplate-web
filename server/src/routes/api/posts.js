import { Router } from 'express';

import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import Post, { validatePost } from '../../models/Post.js';
import Notification from '../../models/Notification.js';

const router = Router();

router.post('/', requireJwtAuth, async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });

    await post.save();
    await post.populate('user');
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempPost = await Post.findById(req.params.id);
    if (!tempPost) return res.status(404).json({ message: 'No such post.' });
    if (!(tempPost.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to edit this post.' });

    const { error } = validatePost(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedPost = await Post.findByIdAndUpdate(tempPost.id, { title: req.body.title, content: req.body.content }, { new: true }).populate('user');
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempPost = await Post.findById(req.params.id);
    if (!tempPost) return res.status(404).json({ message: 'No such post.' });
    if (!(tempPost.user.toString() === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'You do not have privileges to delete that post.' });

    const post = await Post.findByIdAndRemove(tempPost.id);
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/:id/like', requireJwtAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No such post.' });

    const hasLiked = post.likes.includes(req.user.id);
    if (hasLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
      const notification = new Notification({
        user: post.user,
        type: 'like',
        message: `${req.user.username} liked your post`,
        post: post.id,
      });
      await notification.save();
    }

    await post.save();
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user').populate({ path: 'comments', populate: { path: 'user' } });
    if (!post) return res.status(404).json({ message: 'No post found.' });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' }).populate('user');
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;