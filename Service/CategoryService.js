const CategoryRepository = require("../Repository/CategoryRepository");

const CategoryService = {
  //add category service
  addCategory: async (req) => {
    const isDataSaved = await CategoryRepository.createCategory(req);
    if (isDataSaved[0]) {
      return {
        statusCode: 200,
        message: "Category added successfully",
      };
    }
    //category add failed
    return {
      statusCode: 500,
      message: "Category creation failed",
      errors: [
        {
          field: "category",
          message: "Category creation failed",
        },
      ],
    };
  },

  //update category service
  updateCategory: async (req) => {
    const isDataUpdated = await CategoryRepository.updateCategory(req);
    if (isDataUpdated[0]) {
      return {
        statusCode: 200,
        message: "Category updated successfully",
      };
    }
    //category update failed
    return {
      statusCode: 500,
      message: "Category update failed",
      errors: [
        {
          field: "category",
          message: "Category update failed",
        },
      ],
    };
  },

  //delete category service
  deleteCategory: async (req) => {
    const isDataDeleted = await CategoryRepository.deleteCategory(req);
    if (isDataDeleted[0]) {
      return {
        statusCode: 200,
        message: "Category deleted successfully",
      };
    }
    //category delete failed
    return {
      statusCode: 500,
      message: "Category delete failed",
      errors: [
        {
          field: "id",
          message: "Category delete failed",
        },
      ],
    };
  },

  //get category by ID
  getCategoryById: async (req) => {
    const id = req.body.id;
    const isDataById = await CategoryRepository.getCategoryById(id);
    if (isDataById[0]) {
      return {
        statusCode: 200,
        message: "Category data retrieved successfully",
        data: isDataById[0],
      };
    }
    return {
      statusCode: 404,
      message: "Category not found",
      errors: [
        {
          field: "id",
          message: "Category not found",
        },
      ],
    };
  },

  //get all category service
  getAllCategory: async () => {
    const data = await CategoryRepository.getAllCategory();
    return {
      statusCode: 200,
      message: "Success",
      data: data,
      total: data.length,
    };
  },

  //total category count service
  getCategoryCount: async () => {
    return await CategoryRepository.getCategoryCount();
  },
};

module.exports = CategoryService;
