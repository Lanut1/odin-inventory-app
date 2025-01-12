const { body } = require("express-validator");

const validateUserLogin = [
  body('password')
    .trim().notEmpty().withMessage('Password is required'),
  body('username')
    .trim().notEmpty().withMessage('Username is required')
]

module.exports = validateUserLogin;