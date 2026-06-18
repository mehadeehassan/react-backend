const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
const CategoryController = require("../Controller/CategoryController");
const BrandController = require("../Controller/BrandController");
const ProductsListController = require("../Controller/ProductsListController");
const AdminLoginController = require("../Controller/AdminLoginController");

//middleware section
const VerifyAdmin = require("../Middleware/VerifyAdmin");
//config section
const  upload  = require("../Config/cloudinary");
//common section
const validate = require("../Common/Validate");

//validation section
const { SignUpValidation, UpdateValidation } = require("../Validation/SignUpDataValidation");
const ProductListValidation = require("../Validation/ProductsListValidation");
const AdminLoginValidation = require("../Validation/AdminLoginValidation");
const CategoryValidation = require("../Validation/CategoryValidation");
const BrandValidation = require("../Validation/BrandValidation");


// admin login routes
routes.post("/adminLogin", validate(AdminLoginValidation()), AdminLoginController.adminLogin);

// user registration
routes.post("/signup", VerifyAdmin,validate(SignUpValidation()), signUpController.signUp);
routes.put("/updateUser/:id", VerifyAdmin,validate(UpdateValidation()),signUpController.userUpdate);
routes.delete("/deleteUser/:id", VerifyAdmin,signUpController.deleteUser);
routes.get("/getUserById/:id", VerifyAdmin,signUpController.getUserById);
routes.get("/getAllUserLimit", VerifyAdmin,signUpController.getAllUserLimit);

// category routes
routes.post("/addCategory", VerifyAdmin,validate(CategoryValidation()), CategoryController.addCategory);
routes.put("/updateCategory/:id", VerifyAdmin,validate(CategoryValidation()), CategoryController.updateCategory);
routes.delete("/deleteCategory/:id", VerifyAdmin,CategoryController.deleteCategory);
routes.get("/getCategoryById/:id", VerifyAdmin,CategoryController.getCategoryById);
routes.get("/getAllCategory",CategoryController.getAllCategory);

// brand routes
routes.post("/addBrand", VerifyAdmin,validate(BrandValidation()), BrandController.addBrand);
routes.put("/updateBrand/:id", VerifyAdmin,validate(BrandValidation()), BrandController.updateBrand);
routes.delete("/deleteBrand/:id", VerifyAdmin,BrandController.deleteBrand);
routes.get("/getAllBrand",BrandController.getAllBrand);

// product routes
routes.post("/addProduct", VerifyAdmin,upload.single("image"), validate(ProductListValidation()), ProductsListController.addProduct);
routes.put("/updateProduct", VerifyAdmin,upload.single("image"), validate(ProductListValidation()), ProductsListController.updateProduct);
routes.delete("/deleteProduct/:id", VerifyAdmin,ProductsListController.deleteProduct);
routes.get("/getAllProduct",ProductsListController.getAllProduct);

module.exports = routes;