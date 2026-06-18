const BrandService = require("../Service/BrandService");

const BrandController = {
  addBrand: async (req, res) => {
    const isDataSaved = await BrandService.addBrand(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      ...(isDataSaved.errors && { errors: isDataSaved.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  updateBrand: async (req, res) => {
    const isDataUpdated = await BrandService.updateBrand(req);
    return res.status(isDataUpdated.statusCode).json({
      success: isDataUpdated.statusCode == 200 ? true : false,
      message: isDataUpdated.message,
      ...(isDataUpdated.errors && { errors: isDataUpdated.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  deleteBrand: async (req, res) => {
    const isDataDeleted = await BrandService.deleteBrand(req);
    return res.status(isDataDeleted.statusCode).json({
      success: isDataDeleted.statusCode == 200 ? true : false,
      message: isDataDeleted.message,
      ...(isDataDeleted.errors && { errors: isDataDeleted.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },
  getAllBrand: async (req, res) => {
    const isDataSaved = await BrandService.getAllBrand(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      data: isDataSaved.data,
      total: isDataSaved.total,
      metadata: { timestamps: new Date() },
    });
  },
};

module.exports = BrandController;
