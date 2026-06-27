const AdminLoginService = require("../Service/AdminLoginService");

const AdminLoginController = {
  adminLogin: async (req, res) => {
    const result = await AdminLoginService.adminLogin(req);
    return res.status(result.statusCode).json({
      success: result.statusCode === 200 ? true : false,
      message: result.message,
      ...(result.token && { token: result.token }),
      ...(result.statusCode === 200 && {
        name: result.name,
        role: result.role,
        permissions: result.permissions,
      }),
      ...(result.statusCode !== 200 && {
        errors: [{ field: "login", message: result.message }],
      }),
      metadata: {
        timestamps: new Date(),
      },
    });
  },
};

module.exports = AdminLoginController;
