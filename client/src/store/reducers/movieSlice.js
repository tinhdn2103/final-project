import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../apiClient";

//Reducer Thunk
//get list eps

export const getListEps = createAsyncThunk("listEps/getListEps", async (id) => {
  const res = await axios.get("/eps/list/" + id);
  return res.data;
});

//get actors

export const getActors = createAsyncThunk(
  "listActor/getListActors",
  async (id) => {
    const res = await axios.get("/actorMovie/list/" + id);
    return res.data;
  }
);

//get comments

export const getComments = createAsyncThunk(
  "listComments/getListComments",
  async (id) => {
    const res = await axios.get("/comment/list/" + id);
    return res.data;
  }
);

//create comments

export const createComments = createAsyncThunk(
  "listComments/createListComments",
  async (comment) => {
    const res = await axios.post("/comment", comment);
    return res.data;
  }
);

//get list recommend

export const getListRecommend = createAsyncThunk(
  "listRecommend/getListRecommend",
  async (movie) => {
    const res = await axios.get("/recommend/findByMovie/" + movie);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: JSON.parse(localStorage.getItem("movie")) || {},
    listEps: [],
    actors: [],
    comments: [],
    currentEp: 1,
    currentTime: 0,
    listRecommend: [],
  },
  reducers: {
    // setMovie
    setMovie(state, action) {
      state.movie = action.payload;
      localStorage.setItem("movie", JSON.stringify(action.payload));
    },
    //setCurrentEp
    setCurrentEp(state, action) {
      state.currentEp = action.payload;
    },

    //setCurrentTime
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
  },
  extraReducers: {
    //getRandomLists
    [getListEps.fulfilled]: (state, action) => {
      state.listEps = action.payload;
      console.log("get eps success!");
    },
    [getListEps.rejected]: (state, action) => {
      console.log("get eps failed!");
    },
    [getActors.fulfilled]: (state, action) => {
      state.actors = action.payload;
      console.log("get actors success!");
    },
    [getActors.rejected]: (state, action) => {
      console.log("get actors failed!");
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      console.log("get comments success!");
    },
    [createComments.fulfilled]: (state, action) => {
      state.comments.unshift(action.payload);
      console.log("create comments success!");
    },
    [getListRecommend.fulfilled]: (state, action) => {
      state.listRecommend = action.payload;
      console.log("get list recommend success!");
    },
    [getListRecommend.rejected]: (state, action) => {
      console.log("get list recommend failed!");
    },
  },
});

//Reducer

const movieReducer = movieSlice.reducer;

//Selector

export const movieSelector = (state) => ({
  movie: state.movieReducer.movie,
  listEps: state.movieReducer.listEps,
  currentEp: state.movieReducer.currentEp,
  currentTime: state.movieReducer.currentTime,
  actors: state.movieReducer.actors,
  comments: state.movieReducer.comments,
  listRecommend: state.movieReducer.listRecommend,
});

//Action export
export const { setMovie, setCurrentEp, setCurrentTime } = movieSlice.actions;

export default movieReducer;
