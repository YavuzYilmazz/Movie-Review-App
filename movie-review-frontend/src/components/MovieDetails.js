import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api";
import ReviewForm from "./ReviewForm";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Release Date: {new Date(movie.releaseDate).toDateString()}</p>
      <p>Average Rating: {movie.averageRating}</p>
      <h2>Reviews</h2>
      {movie.reviews.length > 0 ? (
        <ul>
          {movie.reviews.map((review) => (
            <li key={review._id}>
              <p>{review.body}</p>
              <p>Rating: {review.rating}</p>
              <p>Date: {new Date(review.date).toDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      <ReviewForm movieId={id} />
    </div>
  );
};

export default MovieDetails;
