const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const epRoute = require("./routes/eps");
const actorRoute = require("./routes/actors");
const actorMovieRoute = require("./routes/actorMovie");
const userRatingRoute = require("./routes/userRating");
const watchingRoute = require("./routes/watching");
const commentRoute = require("./routes/comment");
const serviceRoute = require("./routes/service");
const paymentRoute = require("./routes/payment");
const orderRoute = require("./routes/order");
const trendingRoute = require("./routes/trending");
const recommendRoute = require("./routes/recommend");
const myListRoute = require("./routes/myList");
const listMovieRoute = require("./routes/listMovie");
const axios = require("axios");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const trending = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/trending");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  trending();
  //// setInterval(trending, 90000);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/eps", epRoute);
app.use("/api/actors", actorRoute);
app.use("/api/actorMovie", actorMovieRoute);
app.use("/api/userRating", userRatingRoute);
app.use("/api/watching", watchingRoute);
app.use("/api/comment", commentRoute);
app.use("/api/service", serviceRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);
app.use("/api/trending", trendingRoute);
app.use("/api/recommend", recommendRoute);
app.use("/api/myList", myListRoute);
app.use("/api/listMovie", listMovieRoute);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Backend server is running");
});
