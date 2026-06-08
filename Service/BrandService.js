const BrandRepository = require("../Repository/BrandRepository");

const BrandService = {
  //add brand service
  addBrand: async (req) => {
    try {
      await BrandRepository.createBrand(req);
      return {
        statusCode: 200,
        message: "Brand added successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //update brand service
  updateBrand: async (req) => {
    try {
      await BrandRepository.updateBrand(req);
      return {
        statusCode: 200,
        message: "Brand updated successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //delete brand service
  deleteBrand: async (req) => {
    try {
      await BrandRepository.deleteBrand(req);
      return {
        statusCode: 200,
        message: "Brand deleted successfully",
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },

  //get all brand service
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
      return { statusCode: 500, message: "Something went wrong" };
    }
  },
  //total brand count service
  getBrandCount: async () => {
    try {
      return await BrandRepository.getBrandCount();
    } catch (error) {
      return { statusCode: 500, message: "Something went wrong" };
    }
  },
};

module.exports = BrandService;
