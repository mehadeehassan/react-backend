const VerifyOnlyAdmin = (req, res, next) => {
  const user = req.admin;

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admin can perform this action.",
    });
  }
  next();
};

module.exports = VerifyOnlyAdmin;
