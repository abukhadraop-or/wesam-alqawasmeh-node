const express = require("express");
const app = require("../app");
const authRouter = express.Router();
const { usersTable } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRouter.post("/", async (req, res) => {
  const user = await usersTable.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(user.token);
});

module.exports = authRouter;
