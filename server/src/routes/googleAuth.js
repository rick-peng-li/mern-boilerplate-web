import { Router } from 'express';
import passport from 'passport';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const token = sign({ id: req.user.id }, process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key', { expiresIn: '1h' });
  res.cookie('x-auth-cookie', token, { httpOnly: true });
  res.redirect(process.env.CLIENT_URL_DEV);
});

export default router;