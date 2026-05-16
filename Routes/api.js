const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
//validation section
const SingUpValidation = require("../Validation/SignUpDataValidation");
//validation section
const validate = require("../Common/Validate");

//signup route
routes.post("/signup", validate(SingUpValidation()), signUpController.signUp);

//user update route
routes.put("/updateUser/:id", validate(SingUpValidation()),signUpController.userUpdate);

//user delete route
routes.delete("/deleteUser/:id", signUpController.deleteUser);

//get all user route
routes.get("/getAllUser", signUpController.getAllUser);

//get user by id route
routes.get("/getUserById/:id", signUpController.getUserById);

module.exports = routes;