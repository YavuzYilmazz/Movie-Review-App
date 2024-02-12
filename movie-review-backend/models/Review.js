const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    body: String,
    rating: Number,
    date: Date,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Review", reviewSchema);
