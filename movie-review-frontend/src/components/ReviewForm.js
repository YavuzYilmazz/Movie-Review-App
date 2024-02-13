import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { FaCheck } from "react-icons/fa";
import { addReview } from "../api";
import "../styles/ReviewForm.css";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false); // State to handle rating error message

  const changeRating = (newRating) => {
    setRating(newRating);
    if (newRating > 0) {
      setRatingError(false); // Hide error message if a valid rating is set
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0) {
      setRatingError(true); // Show error message if no rating
      return; // Prevent form submission
    }

    try {
      const response = await addReview(movieId, {
        body: reviewText,
        rating: Number(rating),
        date: new Date().toISOString(),
      });
      onReviewAdded(response.data);
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error occurred while adding the review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className={`rating-section ${rating > 0 ? "rating-given" : ""}`}>
        <label htmlFor="rating">YOUR RATING</label>
        <StarRatings
          rating={rating}
          starRatedColor="yellow"
          changeRating={changeRating}
          numberOfStars={10}
          name="rating"
          starDimension="28px"
          starSpacing="2px"
        />
        {ratingError && <p className="rating-error">Please select a rating.</p>}
        <div className="rating-feedback-placeholder"></div>
        {rating > 0 && (
          <div className="rating-feedback">
            <FaCheck className="checkmark-icon" />
            <span>You rated this {rating}/10</span>
          </div>
        )}
      </div>
      <div className="review-section">
        <label htmlFor="review">YOUR REVIEW</label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </div>
    </form>
  );
};

export default ReviewForm;
