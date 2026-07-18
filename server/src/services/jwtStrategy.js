import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/User.js';

const opts = {};
opts.jwtFromRequest = (req) => {
  let token = null;
  if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  } else if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  return token;
};
opts.secretOrKey = process.env.JWT_SECRET_PROD || process.env.JWT_SECRET_DEV || 'dev-secret-key';

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);