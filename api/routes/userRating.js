const router = require("express").Router();
const UserRating = require("../models/UserRating");
const verify = require("../verifyToken");
var mongoose = require("mongoose");
const Movie = require("../models/Movie");
const axios = require("axios");
//create

router.post("/", verify, async (req, res) => {
  try {
    await UserRating.findOneAndUpdate(
      { movie: req.body.movie, user: req.body.user },
      {
        $set: req.body,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const data = await UserRating.aggregate([
      { $match: { movie: new mongoose.Types.ObjectId(req.body.movie) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          average: { $avg: "$rating" },
        },
      },
    ]);
    const result = await Movie.findOneAndUpdate(
      { _id: req.body.movie },
      {
        $set: { numRate: data[0].total, rate: data[0].average },
      },
      { new: true }
    );
    const response = await axios.get("http://127.0.0.1:5000/fit");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
