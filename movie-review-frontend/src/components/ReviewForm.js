// ReviewForm.js
import React, { useState } from "react";
import { addReview } from "../api";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const review = {
        body: reviewText,
        rating: parseFloat(rating),
        date: new Date(),
      };
      const response = await addReview(movieId, review);
      onReviewAdded(response.data); // Update the parent component with the new review
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
      // Handle the error accordingly (e.g., show an error message to the user)
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
