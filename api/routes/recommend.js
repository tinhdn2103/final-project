const router = require("express").Router();
const verify = require("../verifyToken");
const { spawn } = require("child_process");
const Movie = require("../models/Movie");
const axios = require("axios");

router.get("/findByUser", verify, async (req, res) => {
  const response = await axios.get("http://localhost:5000/" + req.user.id);
  console.log(response.data);
  res.status(200).json(response.data);
  // const py = spawn("python", ["getMovieRecommendByUser.py", req.user.id]);
  // py.stdout.on("data", async (data) => {
  //   data = data.toString();
  //   data = data.replace(/'/g, '"');
  //   data = JSON.parse(data);
  //   res.status(200).json(data);
  // ***
  // try {
  //   const movies = await Movie.find({
  //     _id: {
  //       $in: data,
  //     },
  //   });
  //   movies.sort(function (a, b) {
  //     return (
  //       data.findIndex((id) => a._id.equals(id)) -
  //       data.findIndex((id) => b._id.equals(id))
  //     );
  //   });
  //   res.status(200).json(movies);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  // });

  // py.stderr.on("data", (data) => {
  //   console.error(`stderr: ${data}`);
  //   res.status(500).json(`stderr: ${data}`);
  // });
  // py.on("close", (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });
});

router.get("/findByMovie/:id", verify, async (req, res) => {
  const py = spawn("python", ["getMovieRecommendByMovie.py", req.params.id]);
  py.stdout.on("data", async (data) => {
    data = data.toString();
    data = data.replace(/'/g, '"');
    data = JSON.parse(data);
    // try {
    //   const movies = await Movie.find({
    //     _id: {
    //       $in: data,
    //     },
    //   });
    //   movies.sort(function (a, b) {
    //     return (
    //       data.findIndex((id) => a._id.equals(id)) -
    //       data.findIndex((id) => b._id.equals(id))
    //     );
    //   });
    //   res.status(200).json(movies);
    // } catch (error) {
    //   res.status(500).json(error);
    // }
    res.status(200).json(data);
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).json(`stderr: ${data}`);
  });
  py.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

router.get("/findByCB", verify, async (req, res) => {
  const py = spawn("python", ["getMovieRecommendByCB.py", req.user.id]);
  py.stdout.on("data", async (data) => {
    data = data.toString();
    data = data.replace(/'/g, '"');
    data = JSON.parse(data);
    res.status(200).json(data);
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).json(`stderr: ${data}`);
  });
  py.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;
