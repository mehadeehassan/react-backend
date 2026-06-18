const ProductsListRepository = require("../Repository/ProductsListRepository");

const ProductsListService = {
  //add product service
  addProduct: async (req) => {
    const result = await ProductsListRepository.createProduct(req);
    if (result?.error) {
      return {
        statusCode: 400,
        message: result.message,
        errors: [{ field: "image", message: result.message }],
      };
    }
    if (result[0]) {
      return { statusCode: 200, message: "Product added successfully" };
    }
    //product add failed
    return {
      statusCode: 500,
      message: "Product creation failed",
      errors: [
        {
          field: "product",
          message: "Product creation failed",
        },
      ],
    };
  },

  //get all product service
  getAllProduct: async (req) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const data = await ProductsListRepository.getAllProduct(page, limit);
    const total = await ProductsListRepository.getProductCount();
    return { statusCode: 200, message: "Success", data, total };
  },

  //update product service
  updateProduct: async (req) => {
    const isDataUpdated = await ProductsListRepository.updateProduct(req);
    if (isDataUpdated[0]) {
      return { statusCode: 200, message: "Product updated successfully" };
    }
    //product update failed
    return {
      statusCode: 500,
      message: "Product update failed",
      errors: [
        {
          field: "product",
          message: "Product update failed",
        },
      ],
    };
  },

  //delete product service
  deleteProduct: async (req) => {
    const isDataDeleted = await ProductsListRepository.deleteProduct(req);
    if (isDataDeleted[0]) {
      return { statusCode: 200, message: "Product deleted successfully" };
    }
    //product delete failed
    return {
      statusCode: 500,
      message: "Product delete failed",
      errors: [
        {
          field: "id",
          message: "Product delete failed",
        },
      ],
    };
  },
};

module.exports = ProductsListService;
