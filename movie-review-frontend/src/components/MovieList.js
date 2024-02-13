import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";
import "../styles/MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <h1>Movies</h1>
      <input
        type="text"
        className="movie-list-input"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
            <div className="rating">
              <span>⭐{movie.averageRating || "Not rated"}/10 </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
