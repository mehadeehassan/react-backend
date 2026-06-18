const jwt = require("jsonwebtoken");

// Express এর প্রতিটা middleware তিনটা parameter পায়: req, res, next
const VerifyAdmin = (req, res, next) => {
  // Client এর পাঠানো request এর "Authorization" header থেকে token নেওয়া হচ্ছে
  const token = req.header("Authorization");
  // যদি token না পাওয়া যায় (undefined/null/empty)
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });

  // token পাওয়া গেলে, এখন সেটা verify যাচাই করা হচ্ছে
  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    // verify শেষ হলে এই callback function চলবে
    // err = কোনো সমস্যা হলে error details থাকবে এখানে
    // admin = token সঠিক হলে token এর ভেতরের data যেমন admin id, role এখানে আসবে

    // যদি token invalid হয় ভুয়া বা expired হয় এইখানে থেমে যাবে
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token." });

    req.admin = admin;
    next();
  });
};

module.exports = VerifyAdmin;
