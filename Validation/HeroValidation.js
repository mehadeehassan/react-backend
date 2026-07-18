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
    body("link_type")
      .optional()
      .isIn(["category_discount", "all_discount", "new_arrival", "custom"])
      .withMessage("Invalid link type"),
    body("custom_link")
      .if(body("link_type").equals("custom"))
      .notEmpty()
      .withMessage("Custom link is required when link type is 'custom'"),
  ];
};

module.exports = HeroValidation;