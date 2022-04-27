const express = require("express");
const usersRouter = express.Router();
const { usersTable } = require("../models/index");
const { pick } = require("lodash");
const auth = require("../middleware/auth");
require("dotenv").config();

usersRouter.get("/me", auth, async (req, res) => {
  const user = await usersTable.findOne({ where: { id: req.user.id } });
  res.send(user);
});

usersRouter.post("/", async (req, res) => {
  const user = await usersTable.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already registered");

  const newUser = await usersTable.create(req.body);

  res
    .header("auth-token", newUser.token)
    .json(pick(newUser, ["id", "name", "email"]));
});

module.exports = usersRouter;
