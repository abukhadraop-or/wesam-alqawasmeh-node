const movies = (sequelize, DataTypes) =>
  sequelize.define("movies", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING(10485760),
      defaultValue: "lorem",
    },
    vote_average: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    collection: {
      type: DataTypes.STRING,
    },
  });

module.exports = movies;
