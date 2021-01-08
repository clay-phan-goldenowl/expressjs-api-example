const { Joi } = require('express-validation');

module.exports = {
  UserValidation: {
    body: Joi.object({
      email: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    }),
  },
};
