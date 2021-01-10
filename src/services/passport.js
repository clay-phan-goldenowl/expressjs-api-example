const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

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
