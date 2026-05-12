const SignUpRepository = require("../Repository/SignUpRepository");

//service section
const SignUpService = {
  //create user
  signUp: async (req) => {
    const email = req.body.email;
    //check email
    const existingUser = await SignUpRepository.checkUserIsExistByEmail(email);
    //check email
    if (existingUser) {
      return {
        statusCode: 423,
        message: "Email already exist",
      };
    }
    //create user
    const isDataSaved = await SignUpRepository.createSignUp(req);
    if (isDataSaved[0]) {
      return {
        statusCode: 200,
        message: "User registered successfully",
      };
    }
    //user registration failed
    return {
      statusCode: 500,
      message: "User registration failed",
    };
  },

  //update user
  userUpdate: async (req) => {
    const { email, id } = req.body;

    const emailInUse = await SignUpRepository.checkEmailForUpdate(email, id);
    //check email
    if (emailInUse) {
      return {
        statusCode: 423,
        message: "Email already exist",
      };
    }
    //update user data
    const isDataSaved = await SignUpRepository.editorUser(req);
    if (isDataSaved[0]) {
      return {
        statusCode: 200,
        message: "User updated successfully",
      };
    }
    //user update failed
    return {
      statusCode: 500,
      message: "User update failed",
    };
  },
};

module.exports = SignUpService;
