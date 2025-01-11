const { body } = require("express-validator");
const db = require("../db/queries");

const validateUserRegistration = [
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .custom((value, {req}) => value === req.body.passwordConfirm).withMessage("Passwords don't match")
    .matches('[0-9]').withMessage("Password must contain a number")
    .matches('[A-Z]').withMessage("Password must contain an uppercase letter"),
  body("username")
    .trim().escape().notEmpty().withMessage("Username is required")
    .custom(async value => {
      const records = await db.checkUsername(value);

      if (records > 0) throw new Error("Username is already in use");
    }),
  body("email")
    .trim().normalizeEmail().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .custom(async value => {
      const records = await db.checkEmail(value);

      if (records > 0) throw new Error("Email is already in use");
    })
]

module.exports = validateUserRegistration;