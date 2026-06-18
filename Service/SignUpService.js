const SignUpRepository = require("../Repository/SignUpRepository");

const SignUpService = {
  signUp: async (req) => {
    try {
      const email = req.body.email;
      const existingUser =
        await SignUpRepository.checkUserIsExistByEmail(email);
      if (existingUser) {
        return {
          statusCode: 400,
          message: "Email already exists",
          errors: [
            { field: "email", message: "This email is already registered." },
          ],
        };
      }
      const isDataSaved = await SignUpRepository.createSignUp(req);
      if (isDataSaved[0]) {
        return { statusCode: 200, message: "User registered successfully" };
      }
      return {
        statusCode: 500,
        message: "User registration failed",
        errors: [
          {
            field: "email",
            message: "Failed to register user. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "User registration failed",
        errors: [
          {
            field: "email",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  userUpdate: async (req) => {
    try {
      const { email } = req.body;
      const id = parseInt(req.params.id);
      const emailInUse = await SignUpRepository.checkEmailForUpdate(email, id);
      if (emailInUse) {
        return {
          statusCode: 400,
          message: "Email already in use",
          errors: [
            {
              field: "email",
              message: "This email is already used by another account.",
            },
          ],
        };
      }
      const isDataUpdated = await SignUpRepository.updateUser(req);
      if (isDataUpdated[0]) {
        return { statusCode: 200, message: "User updated successfully" };
      }
      return {
        statusCode: 500,
        message: "User update failed",
        errors: [
          {
            field: "email",
            message: "Failed to update user. Please try again.",
          },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "User update failed",
        errors: [
          {
            field: "email",
            message: "Something went wrong. Please try again.",
          },
        ],
      };
    }
  },

  deleteUser: async (req) => {
    try {
      const id = req.params.id;
      const isDataDeleted = await SignUpRepository.deleteUser(id);
      if (isDataDeleted[0]) {
        return { statusCode: 200, message: "User deleted successfully" };
      }
      return {
        statusCode: 500,
        message: "User delete failed",
        errors: [
          { field: "id", message: "Failed to delete user. Please try again." },
        ],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "User delete failed",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getUserById: async (req) => {
    try {
      const id = req.body.id;
      const isDataById = await SignUpRepository.getUserById(id);
      if (isDataById[0]) {
        return { statusCode: 200, message: "User data retrieved successfully" };
      }
      return {
        statusCode: 404,
        message: "User not found",
        errors: [{ field: "id", message: "No user found with this ID." }],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "User not found",
        errors: [
          { field: "id", message: "Something went wrong. Please try again." },
        ],
      };
    }
  },

  getAllUserLimit: async (req) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const [rows] = await SignUpRepository.getAllUserLimit(page, limit);
      const total = await SignUpRepository.getUserCount();
      if (rows) {
        return {
          statusCode: 200,
          message: "Success",
          data: rows,
          total: total,
        };
      }
      return {
        statusCode: 404,
        message: "No users found",
        errors: [{ field: "user", message: "No users found." }],
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Failed to fetch users",
        errors: [
          { field: "user", message: "Unable to load users. Please refresh." },
        ],
      };
    }
  },
};

module.exports = SignUpService;
