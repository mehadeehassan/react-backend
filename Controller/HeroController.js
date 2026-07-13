const HeroService = require("../Service/HeroService");

const HeroController = {
  addSlide: async (req, res) => {
    const isDataSaved = await HeroService.addSlide(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200,
      message: isDataSaved.message,
      data: isDataSaved.data,
      total: isDataSaved.total,
      errors: isDataSaved.errors || [],
      metadata: { timestamps: new Date() },
    });
  },

  getAllSlides: async (req, res) => {
    const isDataGet = await HeroService.getAllSlides();
    return res.status(isDataGet.statusCode).json({
      success: isDataGet.statusCode == 200,
      message: isDataGet.message,
      data: isDataGet.data,
      metadata: { timestamps: new Date() },
    });
  },

  getActiveSlides: async (req, res) => {
    const isDataGet = await HeroService.getActiveSlides();
    return res.status(isDataGet.statusCode).json({
      success: isDataGet.statusCode == 200,
      message: isDataGet.message,
      data: isDataGet.data,
      metadata: { timestamps: new Date() },
    });
  },

  updateSlide: async (req, res) => {
    const isDataUpdated = await HeroService.updateSlide(req);
    return res.status(isDataUpdated.statusCode).json({
      success: isDataUpdated.statusCode == 200,
      message: isDataUpdated.message,
      errors: isDataUpdated.errors || [],
      metadata: { timestamps: new Date() },
    });
  },

  deleteSlide: async (req, res) => {
    const isDataDeleted = await HeroService.deleteSlide(req);
    return res.status(isDataDeleted.statusCode).json({
      success: isDataDeleted.statusCode == 200,
      message: isDataDeleted.message,
      metadata: { timestamps: new Date() },
    });
  },
};

module.exports = HeroController;