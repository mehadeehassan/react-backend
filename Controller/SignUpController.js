const SignUpService = require("../Service/SignUpService");

//controller section
const signUpController = {
  //create user
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

  //update user
  userUpdate: async (req, res) => {
    //update user data
    const isDataSaved = await SignUpService.userUpdate(req);
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
};

module.exports = signUpController;
