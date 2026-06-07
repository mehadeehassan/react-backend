const SignUpRepository = require("../Repository/SignUpRepository");

const SignUpService = {
  //user registration service
  signUp: async (req) => {
    const email = req.body.email;
    //check email
    const existingUser = await SignUpRepository.checkUserIsExistByEmail(email);
    if (existingUser) {
      return {
        statusCode: 400,
        message: "Email already exist",
        errors: [
          {
            field: "email",
            message: "Email already exist",
          },
        ],
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
      errors: [
        {
          field: "email",
          message: "User registration failed",
        },
      ],
    };
  },

  //update user by id
  userUpdate: async (req) => {
    // const { email } = req.body;
    // const id = req.params.id;
    // console.log(email,id);
    const { email } = req.body;
    const id = parseInt(req.params.id);

    //check email
    const emailInUse = await SignUpRepository.checkEmailForUpdate(email, id);
    if (emailInUse) {
      return {
        statusCode: 400,
        message: "This email is already in use",
        errors: [
          {
            field: "email",
            message: "This email is already in use",
          },
        ],
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
      message: "This email is already in use",
      errors: [
        {
          field: "email",
          message: "This email is already in use",
        },
      ],
    };
  },

  //delete user by id
  deleteUser: async (req) => {
    const id = req.params.id;
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
      errors: [
        {
          field: "id",
          message: "User delete failed",
        },
      ],
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
      errors: [
        {
          field: "id",
          message: "User not found",
        },
      ],
    };
  },
  getAllUserLimit: async (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [rows] = await SignUpRepository.getAllUserLimit(page, limit);
    const total = await SignUpRepository.getUserCount();

    if (rows) {
      return {
        statusCode: 200,
        message: "All user data retrieved successfully",
        data: rows,
        total: total,
      };
    }
    return { statusCode: 404, message: "No users found" };
  },
};
module.exports = SignUpService;
