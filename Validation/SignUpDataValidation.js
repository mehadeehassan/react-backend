const { body } = require("express-validator");

// Signup validation
const SignUpValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be between 2 and 30 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
      .bail()
      .isLength({ min: 10, max: 40 })
      .withMessage("Email must be between 10 and 40 characters")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6, max: 40 })
      .withMessage("Password must be between 6 and 40 characters")
      .bail()
      .isStrongPassword()
      .withMessage(
        "Password must contain uppercase, lowercase, number and symbol",
      ),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error("Password does not match");
        return true;
      }),

    body("role")
      .optional({ checkFalsy: true })
      .isIn(["user", "manager", "admin"])
      .withMessage("Role must be 'user', 'manager' or 'admin'"),
  ];
};

// Update validation — password optional
const UpdateValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be between 2 and 30 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
      .bail()
      .isLength({ min: 10, max: 40 })
      .withMessage("Email must be between 10 and 40 characters")
      .normalizeEmail(),

    body("password")
      .optional({ checkFalsy: true })
      .isLength({ min: 6, max: 40 })
      .withMessage("Password must be between 6 and 40 characters")
      .bail()
      .isStrongPassword()
      .withMessage(
        "Password must contain uppercase, lowercase, number and symbol",
      ),

    body("confirmPassword")
      .optional({ checkFalsy: true })
      .custom((value, { req }) => {
        if (req.body.password && value !== req.body.password) {
          throw new Error("Password does not match");
        }
        return true;
      }),
    body("role")
      .optional({ checkFalsy: true })
      .isIn(["user", "manager", "admin"])
      .withMessage("Role must be 'user', 'manager' or 'admin'"),
  ];
};

const LoginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
      .bail()
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),
  ];
};

module.exports = { SignUpValidation, UpdateValidation, LoginValidation };
