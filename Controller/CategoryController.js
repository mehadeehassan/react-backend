const CategoryService = require("../Service/CategoryService");

//add category controller
const CategoryController = {
  //add category
  addCategory: async (req, res) => {
    const isDataSaved = await CategoryService.addCategory(req);
    return res.status(isDataSaved.statusCode).json({
      // return response
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      ...(isDataSaved.errors && { errors: isDataSaved.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //update category controller
  updateCategory: async (req, res) => {
    const isDataUpdated = await CategoryService.updateCategory(req);
    return res.status(isDataUpdated.statusCode).json({
      // return response
      success: isDataUpdated.statusCode == 200 ? true : false,
      message: isDataUpdated.message,
      ...(isDataUpdated.errors && { errors: isDataUpdated.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //delete category controller
  deleteCategory: async (req, res) => {
    const isDataDeleted = await CategoryService.deleteCategory(req);
    return res.status(isDataDeleted.statusCode).json({
      // return response
      success: isDataDeleted.statusCode == 200 ? true : false,
      message: isDataDeleted.message,
      ...(isDataDeleted.errors && { errors: isDataDeleted.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  // get Category by Id
  getCategoryById: async (req, res) => {
    const isDataById = await CategoryService.getCategoryById(req);
    return res.status(isDataById.statusCode).json({
      success: isDataById.statusCode == 200 ? true : false,
      message: isDataById.message,
      ...(isDataById.errors && { errors: isDataById.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //get all category controller
  getAllCategory: async (req, res) => {
    const isDataSaved = await CategoryService.getAllCategory(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      data: isDataSaved.data,
      total: isDataSaved.total,
      metadata: { timestamps: new Date() },
    });
  },
};

module.exports = CategoryController;
