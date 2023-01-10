const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
const axios = require("axios");
var mongoose = require("mongoose");
//create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      const response = await axios.get("http://127.0.0.1:5000/cb/fit");
      res.status(201).json(savedMovie);
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
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const response = await axios.get("http://127.0.0.1:5000/cb/fit");
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(403).json("You are not allowed!");
  }
});

//unactive

router.put("/unactive/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: { isActive: false },
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
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
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
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
    const movie = await Movie.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      isActive: true,
    });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get random

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { $and: [{ isSeries: true }, { isActive: true }] } },
        { $sample: { size: 1 } },
      ]);
    } else if (type === "movie") {
      movie = await Movie.aggregate([
        { $match: { $and: [{ isSeries: false }, { isActive: true }] } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isActive: true } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find({ isActive: true });
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(403).json("You are not allowed!");
  }
});

//search

router.get("/search", verify, async (req, res) => {
  const q = req.query.q;
  try {
    const response = await axios.get("http://127.0.0.1:5000/cb/search?q=" + q);
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
