const SignUpRepository = require("../Repository/SignUpRepository");

const SignUpService = {
  signUp: async (req) => {
    const email = req.body.email;
    const existingUser = await SignUpRepository.checkUserIsExistByEmail(email);
    if (existingUser) {
      return {
        statusCode: 423,
        message: "Email already exist",
      };
    }
    const isDataSaved = await SignUpRepository.createSignUp(req);
    if (isDataSaved[0]) {
      return {
        statusCode: 200,
        message: "User registered successfully",
      };
    }

    return {
      statusCode: 500,
      message: "User registration failed",
    };
  },
};

module.exports = SignUpService;
