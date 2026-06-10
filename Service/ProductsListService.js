const ProductsListRepository = require("../Repository/ProductsListRepository");

const ProductsListService = {
  addProduct: async (req) => {
    try {
      await ProductsListRepository.createProduct(req);
      return { statusCode: 200, message: "Product added successfully" };
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },

  getAllProduct: async (req) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const data = await ProductsListRepository.getAllProduct(page, limit);
      const total = await ProductsListRepository.getProductCount();
      return { statusCode: 200, message: "Success", data, total };
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },

  updateProduct: async (req) => {
    try {
      await ProductsListRepository.updateProduct(req);
      return { statusCode: 200, message: "Product updated successfully" };
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },

  deleteProduct: async (req) => {
    try {
      await ProductsListRepository.deleteProduct(req);
      return { statusCode: 200, message: "Product deleted successfully" };
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },
};

module.exports = ProductsListService;
