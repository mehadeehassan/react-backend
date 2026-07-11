const ProductsListRepository = require("../Repository/ProductsListRepository");

const ProductsListService = {
  addProduct: async (req) => {
    try {
      const result = await ProductsListRepository.createProduct(req);
      if (result?.error) {
        return {
          statusCode: 400,
          message: result.message,
          errors: [{ field: "image", message: "Please select a valid image." }],
        };
      }
      if (result[0]) {
        return { statusCode: 200, message: "Product added successfully" };
      }
      return {
        statusCode: 500,
        message: "Product creation failed",
        errors: [
          {
            field: "product",
            message: "Failed to add product. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Product creation failed",
        errors: [
          {
            field: "product",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  getAllProduct: async (req) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const onlyActive = req.query.status === "active";
      const data = await ProductsListRepository.getAllProduct(page, limit, onlyActive);
      const total = await ProductsListRepository.getProductCount();
      return { statusCode: 200, message: "Success", data, total };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch products",
        errors: [
          {
            field: "product",
            message: "Unable to load products. Please refresh.",
          },
        ],
      };
    }
  },

  updateProduct: async (req) => {
    try {
      const isDataUpdated = await ProductsListRepository.updateProduct(req);
      if (isDataUpdated[0]) {
        return { statusCode: 200, message: "Product updated successfully" };
      }
      return {
        statusCode: 500,
        message: "Product update failed",
        errors: [
          {
            field: "product",
            message: "Failed to update product. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Product update failed",
        errors: [
          {
            field: "product",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  deleteProduct: async (req) => {
    try {
      const isDataDeleted = await ProductsListRepository.deleteProduct(req);
      if (isDataDeleted[0]) {
        return { statusCode: 200, message: "Product deleted successfully" };
      }
      return {
        statusCode: 500,
        message: "Product delete failed",
        errors: [
          {
            field: "id",
            message: "Failed to delete product. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Product delete failed",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getDiscountedProductsByCategory: async (req) => {
    try {
      const { category } = req.params;
      const data = await ProductsListRepository.getDiscountedProductsByCategory(category);
      return { statusCode: 200, message: "Success", data };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch discounted products",
        errors: [
          {
            field: "product",
            message: "Unable to load products. Please refresh.",
          },
        ],
      };
    }
  },

  getAllDiscountedProducts: async () => {
    try {
      const data = await ProductsListRepository.getAllDiscountedProducts();
      return { statusCode: 200, message: "Success", data };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch discounted products",
        errors: [
          {
            field: "product",
            message: "Unable to load products. Please refresh.",
          },
        ],
      };
    }
  },
};

module.exports = ProductsListService;
