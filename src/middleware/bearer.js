const { usersTable } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) res.status(403).send("Invalid Login !");

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await usersTable.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (error) {
    res.status(403).send("Invalid Login !");
  }
};
