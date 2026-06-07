const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
const CategoryController = require("../Controller/CategoryController");
//validation section
const { SignUpValidation, UpdateValidation } = require("../Validation/SignUpDataValidation");
const CategoryValidation = require("../Validation/CategoryValidation");
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

// add category routes
routes.post("/addCategory", validate(CategoryValidation()), CategoryController.addCategory);

// update category route
routes.put("/updateCategory/:id", validate(CategoryValidation()), CategoryController.updateCategory);

// delete category route
routes.delete("/deleteCategory/:id", CategoryController.deleteCategory);

// get all category route
routes.get("/getAllCategory", CategoryController.getAllCategory);

module.exports = routes;