const mongoose = require("mongoose");
const reviewSchema = require("./Review").schema;

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    releaseDate: Date,
    averageRating: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Movie", movieSchema);
