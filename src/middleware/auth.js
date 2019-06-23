const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // GET TOKEN FROM HEADER
  const token = req.header("x-auth-token");

  // CHECK IF THERE IS NO TOKEN
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization failed!" });
  }

  // VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
