const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user.model');
const { jwtSecret } = require('../config/vars');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jwtSecret,
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try {
    // Find user given the email
    const user = await User.findOne({ email });

    // If not user
    if (!user) {
      return done(null, false);
    }
    // Check password is correct
    const isMatch = await user.isValidPassword(password);
    // If not correct password
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));
