const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TrendingSchema = new Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Trending", TrendingSchema);
