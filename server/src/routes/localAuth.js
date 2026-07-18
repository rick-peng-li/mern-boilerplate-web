import { Router } from 'express';
import passport from 'passport';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import requireLocalAuth from '../middleware/requireLocalAuth.js';

const router = Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(400).json({ message: info.message });
    
    const token = sign({ id: user.id }, process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ token, user: user.toJSON() });
  })(req, res);
});

router.post('/register', requireLocalAuth, (req, res) => {
  const token = sign({ id: req.user.id }, process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key', { expiresIn: '1h' });
  res.cookie('jwt', token, { httpOnly: true });
  res.json({ token, user: req.user.toJSON() });
});

export default router;