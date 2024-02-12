const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.post("/", moviesController.addMovie);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);
router.post("/review/:id", moviesController.addReview);
router.delete("/:movieId/reviews/:reviewId", moviesController.deleteReview);

module.exports = router;
