const { body } = require("express-validator");

const HeroValidation = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("category_id")
      .optional({ values: "falsy" })
      .isInt()
      .withMessage("Category id must be a number"),
    body("button_text").notEmpty().withMessage("Button text is required"),
    body("status")
      .optional()
      .isIn(["active", "inactive"])
      .withMessage("Status must be active or inactive"),
  ];
};

module.exports = HeroValidation;