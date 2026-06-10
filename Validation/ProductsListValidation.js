const { body } = require("express-validator");

const ProductListValidation = () => {
  return [
    body("product_code").notEmpty().withMessage("Product code is required"),
    body("product_name").notEmpty().withMessage("Product name is required"),
    body("brand_id").notEmpty().withMessage("Brand id is required"),
    body("category_id").notEmpty().withMessage("Category id is required"),
    body("status").notEmpty().withMessage("Status is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ];
};

module.exports = ProductListValidation;
