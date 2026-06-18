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
          message: "Incorrect password. Please try again.",
        };
      }
      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      return { statusCode: 200, message: "Logged in successfully", token };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Something went wrong. Please try again.",
      };
    }
  },
};

module.exports = AdminLoginService;
