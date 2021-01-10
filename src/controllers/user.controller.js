const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');

const User = require('../models/user.model');
const { jwtSecret } = require('../config/vars');

const signToken = (user) => JWT.sign({
  iss: 'CodeWork',
  sub: user.id,
  iat: new Date().getTime(), // current time
  exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
}, jwtSecret);

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403)
        .json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();

    // Respond with token
    if (!savedUser) throw Error('Something went wrong when saving user ');

    // Create token
    const token = signToken(newUser);

    res.status(httpStatus.OK)
      .json({ token });
  } catch (error) {
    next(error);
  }
};

exports.secret = async (req, res, next) => {
  console.log('I managed to get here!');
  res.json({ secret: 're-scr' });
};
