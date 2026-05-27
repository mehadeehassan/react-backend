const SignUpService = require("../Service/SignUpService");

//controller section
const signUpController = {
  //user registration controller
  signUp: async (req, res) => {
    const isDataSaved = await SignUpService.signUp(req);
    return res.status(isDataSaved.statusCode).json({
      // return response
      success: isDataSaved.statusCode == 200 ? true : false,
      message: isDataSaved.message,
      // errors থাকলে response এ errors field যোগ হবে, না থাকলে যোগ হবে না
      ...(isDataSaved.errors && { errors: isDataSaved.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //update user by id
  userUpdate: async (req, res) => {
    //update user data
    const isDataUpdated = await SignUpService.userUpdate(req);
    return res.status(isDataUpdated.statusCode).json({
      // return response
      success: isDataUpdated.statusCode == 200 ? true : false,
      message: isDataUpdated.message,
      ...(isDataUpdated.errors && { errors: isDataUpdated.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //delete user by id
  deleteUser: async (req, res) => {
    const isDataDeleted = await SignUpService.deleteUser(req);
    return res.status(isDataDeleted.statusCode).json({
      // return response
      success: isDataDeleted.statusCode == 200 ? true : false,
      message: isDataDeleted.message,
      ...(isDataDeleted.errors && { errors: isDataDeleted.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //get user by id
  getUserById: async (req, res) => {
    const isDataById = await SignUpService.getUserById(req);
    return res.status(isDataById.statusCode).json({
      // return response
      success: isDataById.statusCode == 200 ? true : false,
      message: isDataById.message,
      data: isDataById.data,
      ...(isDataById.errors && { errors: isDataById.errors }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  //get all user limit
  getAllUserLimit: async (req, res) => {
    const isDataAllUserLimit = await SignUpService.getAllUserLimit(req);
    return res.status(isDataAllUserLimit.statusCode).json({
      // return response
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
