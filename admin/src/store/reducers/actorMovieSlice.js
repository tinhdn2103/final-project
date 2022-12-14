import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Actors
export const getActorsOfMovie = createAsyncThunk(
  "actorMovie/getActorsOfMovie",
  async (id) => {
    const res = await axios.get("/actorMovie/list/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Create Actor in Movie
export const createActorMovie = createAsyncThunk(
  "actorMovie/createActorMovie",
  async (actorMovie) => {
    const res = await axios.post("/actorMovie", actorMovie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Delete Actor in Movie

export const deleteActorMovie = createAsyncThunk(
  "actorMovie/deleteActorMovie",
  async (id) => {
    await axios.delete("/actorMovie/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return id;
  }
);

const actorMovieSlice = createSlice({
  name: "actorMovie",
  initialState: {
    actorMovies: [],
  },
  reducers: {},
  extraReducers: {
    [getActorsOfMovie.fulfilled]: (state, action) => {
      state.actorMovies = action.payload;
      console.log("Get actors success!");
    },

    [createActorMovie.fulfilled]: (state, action) => {
      state.actorMovies.push(action.payload);
      console.log("Create actor movie success!");
    },

    [deleteActorMovie.fulfilled]: (state, action) => {
      state.actorMovies = state.actorMovies.filter(
        (actor) => actor._id !== action.payload
      );
      console.log("Delete actor movie success!");
    },
  },
});

//Reducer

const actorMovieReducer = actorMovieSlice.reducer;

//Selector

export const actorMovieSelector = (state) =>
  state.actorMovieReducer.actorMovies;

//Action export
export const {} = actorMovieSlice.actions;

export default actorMovieReducer;
