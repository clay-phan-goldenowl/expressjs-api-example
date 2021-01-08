const express = require('express');
const { validate } = require('express-validation');
const userController = require('../../controllers/user.controller');
const {
  UserValidation,
} = require('../../validations/user.validation');

const router = express.Router();

// POST /api/users
router.route('/signup')
  .post(validate(UserValidation), userController.signUp);

module.exports = router;
