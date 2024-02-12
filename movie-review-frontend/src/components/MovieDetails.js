// MovieDetails.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, deleteReview } from "../api";
import ReviewForm from "./ReviewForm";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const fetchMovie = useCallback(async () => {
    try {
      const response = await getMovieById(id);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const onReviewAdded = (newReview) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      reviews: [...prevMovie.reviews, newReview],
      // Update averageRating if needed, here we just append the review
    }));
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, reviewId);
      setMovie((prevMovie) => ({
        ...prevMovie,
        reviews: prevMovie.reviews.filter((review) => review._id !== reviewId),
        // Update averageRating if needed after deletion
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

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
      <ul>
        {movie.reviews.map((review) => (
          <li key={review._id}>
            <p>{review.body}</p>
            <p>Rating: {review.rating}</p>
            <p>Date: {new Date(review.date).toDateString()}</p>
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete Review
            </button>
          </li>
        ))}
      </ul>
      <ReviewForm movieId={id} onReviewAdded={onReviewAdded} />
    </div>
  );
};

export default MovieDetails;
