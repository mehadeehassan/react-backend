const { body } = require("express-validator");

const AdminLoginValidation = () => [
  body("email")
    .notEmpty().withMessage("Email Required")
    .isEmail().withMessage("Email is not valid"),

  body("password")
    .notEmpty().withMessage("Password Required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

module.exports = AdminLoginValidation;