import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, deleteReview, deleteMovie } from "../api";
import ReviewForm from "./ReviewForm";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleEditMovie = () => {
    navigate(`/edit-movie/${id}`); // Navigate to the edit movie route
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id);
      navigate("/");
    } catch (error) {
      console.error("Error occurred while deleting the movie:", error);
    }
  };

  const onReviewAdded = useCallback((newReview) => {
    // Reload the page to update the reviews
    window.location.reload();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, reviewId);
      setMovie((prevMovie) => {
        // Remove the deleted review from the state
        const updatedReviews = prevMovie.reviews.filter(
          (review) => review._id !== reviewId
        );

        // Recalculate the average rating
        const averageRating =
          updatedReviews.reduce((acc, item) => acc + item.rating, 0) /
          (updatedReviews.length || 1);

        // Update the state with the new reviews and average rating
        return {
          ...prevMovie,
          reviews: updatedReviews,
          averageRating: updatedReviews.length ? averageRating.toFixed(1) : 0,
        };
      });
    } catch (error) {
      console.error("Error occurred while deleting the review:", error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <div className="movie-metadata">
        <span>Release Date: {new Date(movie.releaseDate).toDateString()}</span>
        <span>Average Rating: ⭐{movie.averageRating}/10</span>
      </div>

      <div className="movie-actions">
        <button className="edit-movie-btn" onClick={handleEditMovie}>
          Edit Movie
        </button>
        <button className="delete-movie-btn" onClick={handleDeleteMovie}>
          Delete Movie
        </button>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {movie.reviews.map((review) => (
          <div key={review._id} className="review-item">
            <p className="review-text">{review.body}</p>
            <div className="review-metadata">
              <span>Rating: ⭐{review.rating} /10</span>
              <span>Date: {new Date(review.date).toDateString()}</span>
            </div>
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete Review
            </button>
          </div>
        ))}
      </div>

      <ReviewForm movieId={id} onReviewAdded={onReviewAdded} />
    </div>
  );
};

export default MovieDetails;
