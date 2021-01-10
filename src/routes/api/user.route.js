const express = require('express');
const passport = require('passport');
const { validate } = require('express-validation');
const userController = require('../../controllers/user.controller');
require('../../services/passport');
const { UserValidation } = require('../../validations/user.validation');

const router = express.Router();
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// POST /api/sign-up
router.route('/signup')
  .post(validate(UserValidation), userController.signUp);

// POST /api/sign-in
router.route('/signin')
  .post(validate(UserValidation), passportSignIn, userController.signIn);

// GET /api/secret
router.route('/secret')
  .get(passportJWT, userController.secret);

module.exports = router;
