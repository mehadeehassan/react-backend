const HeroRepository = require("../Repository/HeroRepository");

const HeroService = {
  addSlide: async (req) => {
    try {
      const result = await HeroRepository.createSlide(req);
      if (result?.error) {
        return {
          statusCode: 400,
          message: result.message,
          errors: [{ field: "image", message: "Please select a valid image." }],
        };
      }
      if (result[0]) {
        return { statusCode: 200, message: "Hero slide added successfully" };
      }
      return {
        statusCode: 500,
        message: "Hero slide creation failed",
        errors: [
          { field: "slide", message: "Failed to add slide. Please try again." },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Hero slide creation failed",
        errors: [
          {
            field: "slide",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  getAllSlides: async (req) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const data = await HeroRepository.getAllSlides(page, limit);
      const total = await HeroRepository.getSlideCount();
      return {
        statusCode: 200,
        message: "Success",
        data: data,
        total: total,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch hero slides",
        errors: [
          { field: "slide", message: "Unable to load slides. Please refresh." },
        ],
      };
    }
  },

  getActiveSlides: async () => {
    try {
      const data = await HeroRepository.getActiveSlides();
      return { statusCode: 200, message: "Success", data };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch hero slides",
        errors: [
          { field: "slide", message: "Unable to load slides. Please refresh." },
        ],
      };
    }
  },

  updateSlide: async (req) => {
    try {
      const isDataUpdated = await HeroRepository.updateSlide(req);
      if (isDataUpdated[0]) {
        return { statusCode: 200, message: "Hero slide updated successfully" };
      }
      return {
        statusCode: 500,
        message: "Hero slide update failed",
        errors: [
          {
            field: "slide",
            message: "Failed to update slide. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Hero slide update failed",
        errors: [
          {
            field: "slide",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  deleteSlide: async (req) => {
    try {
      const isDataDeleted = await HeroRepository.deleteSlide(req);
      if (isDataDeleted[0]) {
        return { statusCode: 200, message: "Hero slide deleted successfully" };
      }
      return {
        statusCode: 500,
        message: "Hero slide delete failed",
        errors: [
          { field: "id", message: "Failed to delete slide. Please try again." },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Hero slide delete failed",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },
};

module.exports = HeroService;
