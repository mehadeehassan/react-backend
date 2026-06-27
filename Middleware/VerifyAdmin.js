const jwt = require("jsonwebtoken");
const SignUpRepository = require("../Repository/SignUpRepository");

const VerifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token." });

    try {
      const [rows] = await SignUpRepository.getUserById(decoded.id);
      const user = rows[0];

      if (!user) {
        return res
          .status(403)
          .json({ success: false, message: "User not found." });
      }

      if (user.role !== "admin" && user.role !== "manager") {
        return res
          .status(403)
          .json({ success: false, message: "Access denied. Admins only." });
      }

      req.admin = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  });
};

module.exports = VerifyAdmin;
