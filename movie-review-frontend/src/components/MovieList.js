import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";

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
    <div>
      <h1>Movie List</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie._id}>
            <Link to={`/movie/${movie._id}`}>
              {movie.title} - Average Rating:{" "}
              {movie.averageRating || "Not rated"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
