import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../models/User.js';

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name', 'photos'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            provider: 'facebook',
            name: `${profile.name.givenName} ${profile.name.familyName}`,
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