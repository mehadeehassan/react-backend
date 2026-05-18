const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
//validation section
const SingUpValidation = require("../Validation/SignUpDataValidation");
//validation section
const validate = require("../Common/Validate");

//user registration route and validation
routes.post("/signup", validate(SingUpValidation()), signUpController.signUp);

//user update route and validation
routes.put("/updateUser/:id", validate(SingUpValidation()),signUpController.userUpdate);

//user delete route
routes.delete("/deleteUser/:id", signUpController.deleteUser);

//get user by id route
routes.get("/getUserById/:id", signUpController.getUserById);

//get all user limit route
routes.get("/getAllUserLimit", signUpController.getAllUserLimit);

//get all user route 
// routes.get("/getAllUser", signUpController.getAllUser);

module.exports = routes;