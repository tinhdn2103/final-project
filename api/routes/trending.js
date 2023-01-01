const router = require("express").Router();
const verify = require("../verifyToken");
const Trending = require("../models/Trending");

router.get("/find", verify, async (req, res) => {
  try {
    const movies = await Trending.find(
      {},
      { movie: 1, _id: 0 },
      { sort: { timestamp: -1, score: -1 } }
    ).limit(10);
    result = [];
    movies.map((item) => result.push(item.movie));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
