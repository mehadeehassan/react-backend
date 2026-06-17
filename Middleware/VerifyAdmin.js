const jwt = require("jsonwebtoken");

const VerifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token." });

    req.admin = admin;
    next();
  });
};

module.exports = VerifyAdmin;


// const jwt = require("jsonwebtoken");
// const VerifyAdmin = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token)
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided." });

//   try {
//     req.admin = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res
//       .status(401)
//       .json({ success: false, message: "Invalid or expired token." });
//   }
// };

// module.exports = VerifyAdmin;
