const SignUpService = require("../Service/SignUpService");

const signUpController = {
  signUp: async (req, res) => {
    const isDataSaved = await SignUpService.signUp(req);
    return res.status(isDataSaved.statusCode).json({
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      ...(isDataSaved.errors && { errors: isDataSaved.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  userUpdate: async (req, res) => {
    const isDataUpdated = await SignUpService.userUpdate(req);
    return res.status(isDataUpdated.statusCode).json({
      success: isDataUpdated.statusCode == 200 ? true : false,
      message: isDataUpdated.message,
      ...(isDataUpdated.errors && { errors: isDataUpdated.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  deleteUser: async (req, res) => {
    const isDataDeleted = await SignUpService.deleteUser(req);
    return res.status(isDataDeleted.statusCode).json({
      success: isDataDeleted.statusCode == 200 ? true : false,
      message: isDataDeleted.message,
      ...(isDataDeleted.errors && { errors: isDataDeleted.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  getUserById: async (req, res) => {
    const isDataById = await SignUpService.getUserById(req);
    return res.status(isDataById.statusCode).json({
      success: isDataById.statusCode == 200 ? true : false,
      message: isDataById.message,
      data: isDataById.data,
      ...(isDataById.errors && { errors: isDataById.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  getAllUserLimit: async (req, res) => {
    const isDataAllUserLimit = await SignUpService.getAllUserLimit(req);
    return res.status(isDataAllUserLimit.statusCode).json({
      success: isDataAllUserLimit.statusCode == 200 ? true : false,
      message: isDataAllUserLimit.message,
      data: isDataAllUserLimit.data,
      total: isDataAllUserLimit.total,
      ...(isDataAllUserLimit.errors && { errors: isDataAllUserLimit.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },
};

module.exports = signUpController;
