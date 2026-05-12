const { body } = require("express-validator");
const SignUpDataValidation = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 4, max: 40 })
      .withMessage("Name must be between 2 and 30 characters"),
    body("email")
      .normalizeEmail()
      .isEmail()
      .isLength({ min: 10, max: 40 })
      .withMessage("Email is not valid"),
    body("password")
      .isStrongPassword()
      .isLength({ min: 6, max: 40 })
      .withMessage("Password must be strong"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ];
};

module.exports = SignUpDataValidation;
