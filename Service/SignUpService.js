const SignUpRepository = require("../Repository/SignUpRepository");

const SignUpService = {
  //create user
  signUp: async (req) => {
    const email = req.body.email;
    //check email
    const existingUser = await SignUpRepository.checkUserIsExistByEmail(email);
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
    // console.log(email,id);
    
    //check email
    const emailInUse = await SignUpRepository.checkEmailForUpdate(email, id);
    if (emailInUse) {
      return {
        statusCode: 423,
        message: "Email already exist",
      };
    }
    //update user data
    const isDataUpdated = await SignUpRepository.editorUser(req);
    if (isDataUpdated[0]) {
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

  //delete user
  deleteUser: async (req) => {
    const id = req.body.id;
    const isDataDeleted = await SignUpRepository.deleteUser(id);
    if (isDataDeleted[0]) {
      return {
        statusCode: 200,
        message: "User deleted successfully",
      };
    }
    //user delete failed
    return {
      statusCode: 500,
      message: "User delete failed",
    };
  },
};
module.exports = SignUpService;
