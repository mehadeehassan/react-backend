const { body } = require("express-validator");

const CategoryValidation = () => [
  body("category_name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),
];

module.exports = CategoryValidation;