const router = require("express").Router();
const ListMovie = require("../models/ListMovie");
const verify = require("../verifyToken");

//create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newListMovie = new ListMovie(req.body);
    try {
      const savedListMovie = await newListMovie.save();
      await savedListMovie.populate({
        path: "movie",
        select: ["title", "img"],
      });
      res.status(201).json(savedListMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(403).json("You are not allowed!");
  }
});

//update

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedListMovie = await ListMovie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedListMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(403).json("You are not allowed!");
  }
});

//delete

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ListMovie.findByIdAndDelete(req.params.id);
      res.status(200).json("The list movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(403).json("You are not allowed!");
  }
});

//get

router.get("/find/:id", verify, async (req, res) => {
  try {
    const listMovie = await ListMovie.findById(req.params.id);
    res.status(200).json(listMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get movies of list

router.get("/list/:id", verify, async (req, res) => {
  try {
    const listMovies = await ListMovie.find({
      list: req.params.id,
    }).populate({
      path: "movie",
      select: ["title", "img"],
      match: { isActive: true },
    });
    const result = listMovies.filter((listMovie) => listMovie.movie !== null);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
