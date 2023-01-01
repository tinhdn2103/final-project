const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListMovieSchema = new Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListMovie", ListMovieSchema);
