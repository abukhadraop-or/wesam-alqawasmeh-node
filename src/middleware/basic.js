const base64 = require("base-64");
const { usersTable } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) res.status(403).send("Invalid Login !");

    const basic = req.headers.authorization.split(" ").pop();
    const [user, pass] = base64.decode(basic).split(":");

    req.user = await usersTable.authenticateBasic(user, pass);
    next();
  } catch (error) {
    res.status(403).send("Invalid Login !");
  }
};
