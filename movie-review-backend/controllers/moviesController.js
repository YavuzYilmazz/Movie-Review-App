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
}

module.exports = MoviesController;
