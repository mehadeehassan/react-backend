const { body } = require("express-validator");

const BrandValidation = () => [
  body("brand_name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isString()
    .withMessage("Brand name must be a string"),
];

module.exports = BrandValidation;