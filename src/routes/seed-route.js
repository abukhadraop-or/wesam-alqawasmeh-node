const express = require("express");
const seedRoute = express.Router();
const axios = require("axios");
const { MoviesTable } = require("../models/index");
require("dotenv").config();

seedRoute.post("/:sort", async (req, res) => {
  try {
    const sortBy = req.params.sort;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&region=US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );

    /*collections:
      popularity.desc
      popularity.asc
      vote_average.desc
      vote_average.asc
      release_date.desc
      release_date.asc
      original_title.desc
      original_title.asc
    */

    response.data.results.map(async (item) => {
      await MoviesTable.create({
        title: item.title,
        poster_path: item.poster_path,
        overview: item.overview,
        vote_average: item.vote_average,
        release_date: item.release_date,
        collection: sortBy,
      });
    });

    res.send("Database seeded successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = seedRoute;
