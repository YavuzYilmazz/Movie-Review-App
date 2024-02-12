import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovieById, updateMovie } from "../api";

const MovieForm = () => {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // If there's an id, we're updating a movie

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const response = await getMovieById(id);
          setMovie({
            title: response.data.title,
            description: response.data.description,
            releaseDate: response.data.releaseDate.slice(0, 10),
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await updateMovie(id, movie);
      } else {
        await addMovie(movie);
      }
      navigate("/"); // Redirect to homepage or movie list after submit
    } catch (error) {
      console.error("Error submitting the movie:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          value={movie.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{id ? "Edit" : "Add"} Movie</button>
    </form>
  );
};

export default MovieForm;
