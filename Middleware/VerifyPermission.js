const VerifyPermission = (action) => {
  return (req, res, next) => {
    try {
      const user = req.admin;

      if (user.role === "admin") return next();

      let permissions = [];
      try {
        permissions =
          typeof user.permissions === "string"
            ? JSON.parse(user.permissions)
            : (user.permissions ?? []);
      } catch {
        permissions = [];
      }

      if (!permissions.includes(action)) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to perform this action.",
        });
      }
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  };
};

module.exports = VerifyPermission;
