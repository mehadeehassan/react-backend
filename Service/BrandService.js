const BrandRepository = require("../Repository/BrandRepository");

const BrandService = {
  addBrand: async (req) => {
    try {
      const isDataSaved = await BrandRepository.createBrand(req);
      if (isDataSaved[0]) {
        return { statusCode: 200, message: "Brand added successfully" };
      }
      return {
        statusCode: 500,
        message: "Brand creation failed",
        errors: [
          {
            field: "brand_name",
            message: "Failed to add brand. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Brand creation failed",
        errors: [
          {
            field: "brand_name",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  updateBrand: async (req) => {
    try {
      const isDataUpdated = await BrandRepository.updateBrand(req);
      if (isDataUpdated[0]) {
        return { statusCode: 200, message: "Brand updated successfully" };
      }
      return {
        statusCode: 500,
        message: "Brand update failed",
        errors: [
          {
            field: "brand_name",
            message: "Failed to update brand. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Brand update failed",
        errors: [
          {
            field: "brand_name",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  deleteBrand: async (req) => {
    try {
      const isDataDeleted = await BrandRepository.deleteBrand(req);
      if (isDataDeleted[0]) {
        return { statusCode: 200, message: "Brand deleted successfully" };
      }
      return {
        statusCode: 500,
        message: "Brand delete failed",
        errors: [
          { field: "id", message: "Failed to delete brand. Please try again." },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Brand delete failed",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getAllBrand: async () => {
    try {
      const data = await BrandRepository.getAllBrand();
      return {
        statusCode: 200,
        message: "Success",
        data: data,
        total: data.length,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch brands",
        errors: [
          { field: "brand", message: "Unable to load brands. Please refresh." },
        ],
      };
    }
  },

  getBrandCount: async () => {
    try {
      return await BrandRepository.getBrandCount();
    } catch (error) {
      return 0;
    }
  },
};

module.exports = BrandService;
