const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
const CategoryController = require("../Controller/CategoryController");
const BrandController = require("../Controller/BrandController");
const ProductsListController = require("../Controller/ProductsListController");
const ProductListValidation = require("../Validation/ProductsListValidation");
const  { upload }  = require("../Config/cloudinary");
//validation section
const { SignUpValidation, UpdateValidation } = require("../Validation/SignUpDataValidation");
const CategoryValidation = require("../Validation/CategoryValidation");
const BrandValidation = require("../Validation/BrandValidation");
//validation section
const validate = require("../Common/Validate");

// All User route and validation

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

//End of user routes

//All Category routes and validation

// add category routes
routes.post("/addCategory", validate(CategoryValidation()), CategoryController.addCategory);

// update category route
routes.put("/updateCategory/:id", validate(CategoryValidation()), CategoryController.updateCategory);

// delete category route
routes.delete("/deleteCategory/:id", CategoryController.deleteCategory);

// get all category route
routes.get("/getAllCategory", CategoryController.getAllCategory);

//end of category routes

//All Brand routes and validation

// add brand routes
routes.post("/addBrand", validate(BrandValidation()), BrandController.addBrand);

// update brand route
routes.put("/updateBrand/:id", validate(BrandValidation()), BrandController.updateBrand);

// delete brand route
routes.delete("/deleteBrand/:id", BrandController.deleteBrand);

// get all brand route
routes.get("/getAllBrand", BrandController.getAllBrand);

//end of brand routes

//All Product routes and validation

// add product routes
routes.post("/addProduct", upload.single("image"), validate(ProductListValidation()), ProductsListController.addProduct);

// update product route
routes.put("/updateProduct", upload.single("image"), validate(ProductListValidation()), ProductsListController.updateProduct);

// delete product route
routes.delete("/deleteProduct/:id", ProductsListController.deleteProduct);

// get all product route
routes.get("/getAllProduct", ProductsListController.getAllProduct);

//end of product routes

module.exports = routes;