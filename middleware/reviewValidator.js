const { body } = require("express-validator");

const validatorProductReview = [
  body("review")
    .trim().notEmpty().withMessage('Review cannot be empty')
    .isLength({ max: 1000 }).withMessage('Review cannot exceed 1000 characters')
    .custom((_, {req}) => {
      if (!req.user) throw new Error('Please log in to submit a review');

      return true;
    })
]

module.exports = validatorProductReview;