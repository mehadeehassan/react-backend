const BrandRepository = require("../Repository/BrandRepository");

const BrandService = {
  //add brand service
  addBrand: async (req) => {
    const isDataSaved = await BrandRepository.createBrand(req);
    if (isDataSaved[0]) {
      return {
        statusCode: 200,
        message: "Brand added successfully",
      };
    }
    //brand add failed
    return {
      statusCode: 500,
      message: "Brand creation failed",
      errors: [
        {
          field: "brand",
          message: "Brand creation failed",
        },
      ],
    };
  },

  //update brand service
  updateBrand: async (req) => {
    const isDataUpdated = await BrandRepository.updateBrand(req);
    if (isDataUpdated[0]) {
      return {
        statusCode: 200,
        message: "Brand updated successfully",
      };
    }
    //brand update failed
    return {
      statusCode: 500,
      message: "Brand update failed",
      errors: [
        {
          field: "brand",
          message: "Brand update failed",
        },
      ],
    };
  },

  //delete brand service
  deleteBrand: async (req) => {
    const isDataDeleted = await BrandRepository.deleteBrand(req);
    if (isDataDeleted[0]) {
      return {
        statusCode: 200,
        message: "Brand deleted successfully",
      };
    }
    //brand delete failed
    return {
      statusCode: 500,
      message: "Brand delete failed",
      errors: [
        {
          field: "id",
          message: "Brand delete failed",
        },
      ],
    };
  },

  //get all brand service
  getAllBrand: async () => {
    const data = await BrandRepository.getAllBrand();
    return {
      statusCode: 200,
      message: "Success",
      data: data,
      total: data.length,
    };
  },

  //total brand count service
  getBrandCount: async () => {
    return await BrandRepository.getBrandCount();
  },
};

module.exports = BrandService;
