import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get movies of list
export const getMoviesOfList = createAsyncThunk(
  "listMovie/getMoviesOfList",
  async (id) => {
    const res = await axios.get("/listMovie/list/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Create movie in list
export const createListMovie = createAsyncThunk(
  "listMovie/createListMovie",
  async (listMovie) => {
    const res = await axios.post("/listMovie", listMovie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Delete movie in list

export const deleteListMovie = createAsyncThunk(
  "listMovie/deleteListMovie",
  async (id) => {
    await axios.delete("/listMovie/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return id;
  }
);

const listMovieSlice = createSlice({
  name: "listMovie",
  initialState: {
    listMovies: [],
  },
  reducers: {},
  extraReducers: {
    [getMoviesOfList.fulfilled]: (state, action) => {
      state.listMovies = action.payload;
      console.log("Get movies success!");
    },

    [createListMovie.fulfilled]: (state, action) => {
      state.listMovies.push(action.payload);
      console.log("Create list movie success!");
    },

    [deleteListMovie.fulfilled]: (state, action) => {
      state.listMovies = state.listMovies.filter(
        (movie) => movie._id !== action.payload
      );
      console.log("Delete list movie success!");
    },
  },
});

//Reducer

const listMovieReducer = listMovieSlice.reducer;

//Selector

export const listMovieSelector = (state) => state.listMovieReducer.listMovies;

//Action export
export const {} = listMovieSlice.actions;

export default listMovieReducer;
