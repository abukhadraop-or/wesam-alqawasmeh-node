const { Sequelize, DataTypes } = require("sequelize");
const movieModel = require("./movie-model");
const userModel = require("./user-model");
require("dotenv").config();

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const MoviesTable = movieModel(sequelize, DataTypes);
const usersTable = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  MoviesTable,
  usersTable,
};
