import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/User.js';

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            provider: 'google',
            name: profile.displayName,
            username: profile.emails[0].value.split('@')[0],
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
}