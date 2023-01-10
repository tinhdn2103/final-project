import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Actors
export const getActors = createAsyncThunk("actor/getActors", async () => {
  const res = await axios.get("/actors", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  return res.data;
});

//Create Actors
export const createActor = createAsyncThunk(
  "actor/createActor",
  async (actor) => {
    const res = await axios.post("/actors", actor, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

//Delete Actor

export const deleteActor = createAsyncThunk("actor/deleteActor", async (id) => {
  await axios.delete("/actors/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return id;
});

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actors: [],
  },
  reducers: {},
  extraReducers: {
    [getActors.fulfilled]: (state, action) => {
      state.actors = action.payload;
      console.log("Get actors success!");
    },

    [createActor.fulfilled]: (state, action) => {
      state.actors.push(action.payload);
      console.log("Create actor success!");
    },

    [deleteActor.fulfilled]: (state, action) => {
      state.actors = state.actors.filter(
        (actor) => actor._id !== action.payload
      );
      console.log("Delete actor success!");
    },
  },
});

//Reducer

const actorReducer = actorSlice.reducer;

//Selector

export const actorSelector = (state) => state.actorReducer.actors;

//Action export
export const {} = actorSlice.actions;

export default actorReducer;
