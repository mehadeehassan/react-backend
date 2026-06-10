const ProductsListService = require("../Service/ProductsListService");

const ProductsListController = {
  addProduct: async (req, res) => {
    const isDataSaved = await ProductsListService.addProduct(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      metadata: { timestamps: new Date() },
    });
  },

  getAllProduct: async (req, res) => {
    const isDataGet = await ProductsListService.getAllProduct(req);
    return res.status(isDataGet.statusCode).json({
      success: isDataGet.statusCode == 200 ? true : false,
      message: isDataGet.message,
      data: isDataSaved.data,
      total: isDataGet.total,
      metadata: { timestamps: new Date() },
    });
  },

  updateProduct: async (req, res) => {
    const isDataUpdated = await ProductsListService.updateProduct(req);
    return res.status(isDataUpdated.statusCode).json({
      success: isDataUpdated.statusCode == 200 ? true : false,
      message: isDataUpdated.message,
      metadata: { timestamps: new Date() },
    });
  },

  deleteProduct: async (req, res) => {
    const isDataDeleted = await ProductsListService.deleteProduct(req);
    return res.status(isDataDeleted.statusCode).json({
      success: isDataDeleted.statusCode == 200 ? true : false,
      message: isDataDeleted.message,
      metadata: { timestamps: new Date() },
    });
  },
};

module.exports = ProductsListController;
