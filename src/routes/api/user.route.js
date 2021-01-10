const express = require('express');
const passport = require('passport');
const { validate } = require('express-validation');
const userController = require('../../controllers/user.controller');
require('../../services/passport');
const {
  UserValidation,
} = require('../../validations/user.validation');

const router = express.Router();

// POST /api/users
router.route('/signup')
  .post(validate(UserValidation), userController.signUp);

// GET /api/secret
router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), userController.secret);

module.exports = router;
