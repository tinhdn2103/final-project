import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Movies
export const getMovies = createAsyncThunk("movie/getMovies", async () => {
  const res = await axios.get("/movies", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Create Movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movie) => {
    const res = await axios.post("/movies", movie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Delete Movie

export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  await axios.put(
    "/movies/unactive/" + id,
    {},
    {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }
  );
  return id;
});

//Update Movie

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (newMovie) => {
    const res = await axios.put("/movies/" + newMovie._id, newMovie, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getMovies.fulfilled]: (state, action) => {
      state.movies = action.payload;
      state.isFetching = false;
      state.error = false;
      console.log("Get movie success!");
    },

    [createMovie.fulfilled]: (state, action) => {
      state.movies.push(action.payload);
      state.isFetching = false;
      state.error = false;
      console.log("Create movie success!");
    },

    [deleteMovie.fulfilled]: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
      state.isFetching = false;
      state.error = false;
      console.log("Delete movie success!");
    },

    [updateMovie.fulfilled]: (state, action) => {
      state.movies = state.movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );
      state.isFetching = false;
      state.error = false;
      console.log("Update movie success!");
    },
  },
});

//Reducer

const movieReducer = movieSlice.reducer;

//Selector

export const movieSelector = (state) => ({
  movies: state.movieReducer.movies,
  isFetching: state.movieReducer.isFetching,
  error: state.movieReducer.error,
});

//Action export
export const {} = movieSlice.actions;

export default movieReducer;
