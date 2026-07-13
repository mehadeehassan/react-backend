const CategoryRepository = require("../Repository/CategoryRepository");

const CategoryService = {
  addCategory: async (req) => {
    try {
      const isDataSaved = await CategoryRepository.createCategory(req);
      if (isDataSaved[0]) {
        return { statusCode: 200, message: "Category added successfully" };
      }
      return {
        statusCode: 500,
        message: "Category creation failed",
        errors: [
          {
            field: "category_name",
            message: "Failed to add category. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Category creation failed",
        errors: [
          {
            field: "category_name",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  updateCategory: async (req) => {
    try {
      const isDataUpdated = await CategoryRepository.updateCategory(req);
      if (isDataUpdated[0]) {
        return { statusCode: 200, message: "Category updated successfully" };
      }
      return {
        statusCode: 500,
        message: "Category update failed",
        errors: [
          {
            field: "category_name",
            message: "Failed to update category. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Category update failed",
        errors: [
          {
            field: "category_name",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  deleteCategory: async (req) => {
    try {
      const isDataDeleted = await CategoryRepository.deleteCategory(req);
      if (isDataDeleted[0]) {
        return { statusCode: 200, message: "Category deleted successfully" };
      }
      return {
        statusCode: 500,
        message: "Category delete failed",
        errors: [
          {
            field: "id",
            message: "Failed to delete category. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Category delete failed",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getProductByCategoryId: async (req) => {
    try {
      const id = req.params.id;
      const isDataById = await CategoryRepository.getProductByCategoryId(id);
      if (isDataById && isDataById.length > 0) {
        return {
          statusCode: 200,
          message: "Category data retrieved successfully",
          data: isDataById,
        };
      }
      return {
        statusCode: 404,
        message: "Category not found",
        errors: [{ field: "id", message: "No category found with this ID." }],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Category not found",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getAllCategory: async (req) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const data = await CategoryRepository.getAllCategory( page, limit);
      const total = await CategoryRepository.getCategoryCount();
      return {
        statusCode: 200,
        message: "Success",
        data: data,
        total: total,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch categories",
        errors: [
          {
            field: "category",
            message: "Unable to load categories. Please refresh.",
          },
        ],
      };
    }
  },

  getCategoryCount: async () => {
    try {
      return await CategoryRepository.getCategoryCount();
    } catch (error) {
      return 0;
    }
  },
};

module.exports = CategoryService;
