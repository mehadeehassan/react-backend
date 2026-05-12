const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
//validation section
const SingUpValidation = require("../Validation/SignUpDataValidation");
//validation section
const validate = require("../Common/Validate");

//  all routes section

//signup route
routes.post("/signup", validate(SingUpValidation()), signUpController.signUp);

//user update route
routes.put(
  "/users/:id",
  validate(SingUpValidation()),
  signUpController.userUpdate,
);

module.exports = routes;
