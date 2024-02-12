const Movie = require("../models/Movie");

class MoviesController {
  // Get all movies
  static async getMovies(req, res) {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single movie by id
  static async getMovieById(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add a new movie
  static async addMovie(req, res) {
    const movie = new Movie(req.body);
    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update a movie
  static async updateMovie(req, res) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMovie)
        return res.status(404).json({ message: "Movie not found" });
      res.json(updatedMovie);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a movie
  static async deleteMovie(req, res) {
    try {
      const result = await Movie.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json({ message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add a review to a movie
  static async addReview(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      const review = req.body;
      if (
        typeof review.rating !== "number" ||
        review.rating < 0 ||
        review.rating > 5
      ) {
        return res.status(400).json({ message: "Invalid rating value" });
      }

      movie.reviews.push(review);

      await movie.save();
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a review
  static async deletereview(req, res) {
    try {
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      movie.reviews = movie.reviews.filter(
        (review) => review._id.toString() !== req.params.reviewId
      );

      await movie.save();
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MoviesController;
