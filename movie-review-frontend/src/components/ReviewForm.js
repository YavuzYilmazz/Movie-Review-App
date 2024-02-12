import React, { useState } from "react";
import { addReview } from "../api";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addReview(movieId, {
        body: reviewText,
        rating: Number(rating),
        date: new Date().toISOString(),
      });
      // After adding the review, trigger a page reload
      onReviewAdded(response.data); // This will be changed
      // Clear the form fields
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error occurred while adding the review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        min="0"
        max="5"
        step="0.1"
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
