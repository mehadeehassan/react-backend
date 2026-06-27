const routes = require("express").Router();

//controller section
const signUpController = require("../Controller/SignUpController");
const CategoryController = require("../Controller/CategoryController");
const BrandController = require("../Controller/BrandController");
const ProductsListController = require("../Controller/ProductsListController");
const AdminLoginController = require("../Controller/AdminLoginController");

//middleware section
const VerifyAdmin = require("../Middleware/VerifyAdmin");
const VerifyOnlyAdmin = require("../Middleware/VerifyOnlyAdmin");
const VerifyPermission = require("../Middleware/VerifyPermission");

//config section
const  upload  = require("../Config/cloudinary");
//common section
const validate = require("../Common/Validate");

//validation section
const { SignUpValidation, UpdateValidation, LoginValidation } = require("../Validation/SignUpDataValidation");
const ProductListValidation = require("../Validation/ProductsListValidation");
const AdminLoginValidation = require("../Validation/AdminLoginValidation");
const CategoryValidation = require("../Validation/CategoryValidation");
const BrandValidation = require("../Validation/BrandValidation");


// admin login routes
routes.post("/adminLogin", validate(AdminLoginValidation()), AdminLoginController.adminLogin);

// public customer
routes.post("/login", validate(LoginValidation()), signUpController.login);
routes.post("/register", validate(SignUpValidation()), signUpController.register);

// user registration 
routes.post("/signup", VerifyAdmin, VerifyOnlyAdmin, validate(SignUpValidation()), signUpController.signUp);
routes.put("/updateUser/:id", VerifyAdmin, VerifyOnlyAdmin, validate(UpdateValidation()), signUpController.userUpdate);
routes.delete("/deleteUser/:id", VerifyAdmin, VerifyOnlyAdmin, signUpController.deleteUser);
routes.get("/getUserById/:id", VerifyAdmin, VerifyOnlyAdmin, signUpController.getUserById);
routes.get("/getAllUserLimit", VerifyAdmin, VerifyOnlyAdmin, signUpController.getAllUserLimit);

// category routes 
routes.post("/addCategory", VerifyAdmin, VerifyPermission("add_category"), validate(CategoryValidation()), CategoryController.addCategory);
routes.put("/updateCategory/:id", VerifyAdmin, VerifyPermission("update_category"), validate(CategoryValidation()), CategoryController.updateCategory);
routes.delete("/deleteCategory/:id", VerifyAdmin, VerifyPermission("delete_category"), CategoryController.deleteCategory);
routes.get("/getProductCategoryById/:id",CategoryController.getProductByCategoryId);
routes.get("/getAllCategory",CategoryController.getAllCategory);

// brand routes
routes.post("/addBrand", VerifyAdmin, VerifyPermission("add_brand"), validate(BrandValidation()), BrandController.addBrand);
routes.put("/updateBrand/:id", VerifyAdmin, VerifyPermission("update_brand"), validate(BrandValidation()), BrandController.updateBrand);
routes.delete("/deleteBrand/:id", VerifyAdmin, VerifyPermission("delete_brand"), BrandController.deleteBrand);
routes.get("/getAllBrand",BrandController.getAllBrand);

// product routes
routes.post("/addProduct", VerifyAdmin, VerifyPermission("add_product"), upload.single("image"), validate(ProductListValidation()), ProductsListController.addProduct);
routes.put("/updateProduct", VerifyAdmin, VerifyPermission("update_product"), upload.single("image"), validate(ProductListValidation()), ProductsListController.updateProduct);
routes.delete("/deleteProduct/:id", VerifyAdmin, VerifyPermission("delete_product"), ProductsListController.deleteProduct);
routes.get("/getAllProduct",ProductsListController.getAllProduct);

module.exports = routes;