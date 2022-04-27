const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
