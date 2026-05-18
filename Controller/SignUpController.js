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
      data: req.body,
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
      data: req.body,
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
      data: req.body,
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
      metadata: {
        timestamps: new Date(),
      },
    });
  },

  // //get all user
  // getAllUser: async (req, res) => {
  //   const isDataAllUser = await SignUpService.getAllUser(req);
  //   return res.status(isDataAllUser.statusCode).json({
  //     // return response
  //     success: isDataAllUser.statusCode == 200 ? true : false,
  //     message: isDataAllUser.message,
  //     data: isDataAllUser.data,
  //     metadata: {
  //       timestamps: new Date(),
  //     },
  //   });
  // },
};

module.exports = signUpController;
