import { Router } from 'express';
import passport from 'passport';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const router = Router();

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  const token = sign({ id: req.user.id }, process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key', { expiresIn: '1h' });
  res.cookie('x-auth-cookie', token, { httpOnly: true });
  res.redirect(process.env.CLIENT_URL_DEV);
});

export default router;