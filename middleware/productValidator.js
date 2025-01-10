const { body } = require("express-validator");

const validateProductForm = [
  body("name").trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ max: 255}).withMessage("Product name should be less than 255 characters"),
  body("description").trim()
    .notEmpty().withMessage("Product description is required")
    .isLength({ max: 1500 }).withMessage("Product description should be less than 1500 cheracters"),
  body("photo_url").trim()
    .isURL().withMessage("Please provide valid photo URL"),
  body("brand_name").notEmpty().withMessage("Please select brand"),
  body("newBrandText").optional().trim()
    .notEmpty().withMessage("New brand name is required"),
  body("category_name").notEmpty().withMessage("Please select category"),
  body("newCategoryText").optional().trim()
    .notEmpty().withMessage("New category is required"),
  body("skintype_name").notEmpty().withMessage("Please select skintype"),
  body("newSkintypeText").optional().trim()
    .notEmpty().withMessage("New skintype is required"),
]
 
module.exports = validateProductForm;