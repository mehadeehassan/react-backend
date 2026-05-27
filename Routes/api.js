const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
//validation section
const { SignUpValidation, UpdateValidation } = require("../Validation/SignUpDataValidation");
//validation section
const validate = require("../Common/Validate");

//user registration route and validation
routes.post("/signup", validate(SignUpValidation()), signUpController.signUp);

//user update route and validation
routes.put("/updateUser/:id", validate(UpdateValidation()),signUpController.userUpdate);

//user delete route
routes.delete("/deleteUser/:id", signUpController.deleteUser);

//get user by id route
routes.get("/getUserById/:id", signUpController.getUserById);

//get all user limit route
routes.get("/getAllUserLimit", signUpController.getAllUserLimit);

module.exports = routes;