const SignUpRepository = require("../Repository/SignUpRepository");

const SignUpService = {
  //user registration service
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
    //create user data
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

  //update user by id
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
    const isDataUpdated = await SignUpRepository.updateUser(req);
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

  //delete user by id
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

  //get user by id
  getUserById: async (req) => {
    const id = req.body.id;
    const isDataById = await SignUpRepository.getUserById(id);
    if (isDataById[0]) {
      return {
        statusCode: 200,
        message: "User data retrieved successfully",
      };
    }
    //user data failed
    return {
      statusCode: 404,
      message: "User not found",
    };
  },

  //get all user limit
  getAllUserLimit: async (req) => {
    const isDataAllUserLimit = await SignUpRepository.getAllUserLimit();
    if (isDataAllUserLimit[0]) {
      return {
        statusCode: 200,
        message: "All user data retrieved successfully",
        data: isDataAllUserLimit[0],
      };
    }
    //user data failed
    return {
      statusCode: 404,
      message: "No users found",
    };
  },

  // //get all user
  // getAllUser: async (req) => {
  //   const isDataAllUser = await SignUpRepository.getAllUser();
  //   if (isDataAllUser[0]) {
  //     return {
  //       statusCode: 200,
  //       message: "All user data retrieved successfully",
  //       data: isDataAllUser[0],
  //     };
  //   }
  //   //user data failed
  //   return {
  //     statusCode: 404,
  //     message: "No users found",
  //   };
  // },
};
module.exports = SignUpService;
