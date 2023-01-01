const router = require("express").Router();
const verify = require("../verifyToken");
const axios = require("axios");

router.get("/findByUser", verify, async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/cf/users_based/" + req.user.id
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/findByMovie/:id", verify, async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/cb/recommend_by_movie/" + req.params.id
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/findByCB", verify, async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/cb/recommend_by_user/" + req.user.id
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
