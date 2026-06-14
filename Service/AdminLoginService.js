const AdminLoginRepository = require("../Repository/AdminLoginRepository");
const jwt = require("jsonwebtoken");

const AdminLoginService = {
  adminLogin: async (req) => {
    try {
      const { email, password } = req.body;
      const admin = await AdminLoginRepository.findAdminByEmail(email);
      if (!admin) {
        return {
          statusCode: 404,
          message: "Admin not found",
        };
      }
      if (admin.password !== password) {
        return {
          statusCode: 401,
          message: "Password does not match",
        };
      }
      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        "admin_secret_key",
        { expiresIn: "1d" }
      );

      return {
        statusCode: 200,
        message: "Admin logged in successfully",
        token: token,
      };

    } catch (error) {
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
    }
  },
};

module.exports = AdminLoginService;