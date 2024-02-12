import axios from "axios";

const API_URL = "http://localhost:5000";

const getMovies = async () => {
  return await axios.get(`${API_URL}/movies`);
};

const getMovieById = async (id) => {
  return await axios.get(`${API_URL}/movies/${id}`);
};

const addMovie = async (movie) => {
  return await axios.post(`${API_URL}/movies`, movie);
};

const addReview = async (movieId, review) => {
  return await axios.post(`${API_URL}/movies/review/${movieId}`, review);
};

const updateMovie = async (movieId, movie) => {
  return await axios.put(`${API_URL}/movies/${movieId}`, movie);
};

const deleteMovie = async (movieId) => {
  return await axios.delete(`${API_URL}/movies/${movieId}`);
};

export {
  getMovies,
  getMovieById,
  addMovie,
  addReview,
  updateMovie,
  deleteMovie,
};
