const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const moviesRoutes = require("./routes/moviesRoutes");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/MovieReview")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/movies", moviesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
