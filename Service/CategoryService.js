const CategoryRepository = require("../Repository/CategoryRepository");

const CategoryService = {
  //add category service
  addCategory: async (req) => {
    try {
      await CategoryRepository.createCategory(req);
      return {
        statusCode: 200,
        message: "Category added successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //update category service
  updateCategory: async (req) => {
    try {
      await CategoryRepository.updateCategory(req);
      return {
        statusCode: 200,
        message: "Category updated successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //delete category service
  deleteCategory: async (req) => {
    try {
      await CategoryRepository.deleteCategory(req);
      return {
        statusCode: 200,
        message: "Category deleted successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //get all category service
  getAllCategory: async () => {
    try {
      const data = await CategoryRepository.getAllCategory();
      return {
        statusCode: 200,
        message: "Success",
        data: data,
        total: data.length,
      };
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },
  //total category count service
  getCategoryCount: async () => {
    try {
      return await CategoryRepository.getCategoryCount();
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },
};

module.exports = CategoryService;
