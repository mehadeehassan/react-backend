const { validationResult } = require("express-validator");
const routes = require("express").Router();

// all pages section
const signUpController = require("../Controller/SignUpController");
const DataValidation = require("../form-validation/SignUpDataValidation");
const validate = require("../Validate/Validate");

//  all routes section
routes.post("/signup", validate(DataValidation()), signUpController.signUp);

module.exports = routes;
