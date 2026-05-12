const routes = require("express").Router();

// all pages section
const signUpController = require("../Controller/SignUpController");
const DataValidation = require("../Validation/SignUpDataValidation");
const validate = require("../Common/Validate");

//  all routes section
routes.post("/signup",  validate(DataValidation()),signUpController.signUp);

module.exports = routes;
