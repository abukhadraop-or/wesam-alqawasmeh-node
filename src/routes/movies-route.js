const express = require("express");
const moviesRouter = express.Router();
const { MoviesTable } = require("../models/index");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

moviesRouter.get("/", async (req, res) => {
  try {
    if (!req.query.sort) req.query.sort = "popularity.desc";
    const movies = await MoviesTable.findAll({
      where: { collection: req.query.sort },
    });
    res.json({ results: movies });
  } catch (error) {
    res.status(400).send(e.message);
  }
});

moviesRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movies = await MoviesTable.findOne({ where: { id } });
    res.json(movies);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

moviesRouter.post("/", auth, async (req, res) => {
  try {
    const movie = await MoviesTable.create(req.body);
    res.send(movie);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

moviesRouter.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMovie = await MoviesTable.update(req.body, { where: { id } });
    res.send(updatedMovie);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

moviesRouter.delete("/:id", auth, admin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await MoviesTable.destroy({ where: { id } });
    res.send(deletedMovie);
  } catch (error) {
    res.status(400).send(e.message);
  }
});

module.exports = moviesRouter;
