// src/components/ReviewForm.js
import React, { useState } from "react";
import { addReview } from "../api";

const ReviewForm = ({ movieId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      body: reviewText,
      rating: Number(rating),
      date: new Date(),
    };
    try {
      await addReview(movieId, review);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
