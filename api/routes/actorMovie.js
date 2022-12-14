const router = require("express").Router();
const ActorMovie = require("../models/ActorMovie");
const verify = require("../verifyToken");
const axios = require("axios");

//create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newActorMovie = new ActorMovie(req.body);
    try {
      const savedActorMovie = await newActorMovie.save();
      await savedActorMovie.populate("actor");
      const response = await axios.get("http://127.0.0.1:5000/cb/fit");
      res.status(201).json(savedActorMovie);
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
      const updatedActorMovie = await ActorMovie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedActorMovie);
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
      await ActorMovie.findByIdAndDelete(req.params.id);
      const response = await axios.get("http://127.0.0.1:5000/cb/fit");
      res.status(200).json("The actor movie has been deleted...");
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
    const actorMovie = await ActorMovie.findById(req.params.id);
    res.status(200).json(actorMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get actors of movie

router.get("/list/:id", verify, async (req, res) => {
  try {
    const actorsMovie = await ActorMovie.find({
      movie: req.params.id,
    }).populate("actor");
    res.status(200).json(actorsMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
