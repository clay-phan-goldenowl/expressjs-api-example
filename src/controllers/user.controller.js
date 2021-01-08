const httpStatus = require('http-status');
const User = require('../models/user.model');

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
    res.status(httpStatus.OK)
      .json({
        user: 'created',
      });
  } catch (error) {
    next(error);
  }
};
