const SignUpService = require("../Service/SignUpService");

const signUpController = {
  signUp: async (req, res) => {
    const isDataSaved = await SignUpService.signUp(req);
    return res.status(isDataSaved.statusCode).json({
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
