const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.post("/", moviesController.addMovie);

module.exports = router;
