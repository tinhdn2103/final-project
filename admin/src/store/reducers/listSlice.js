import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk

//Get Lists
export const getLists = createAsyncThunk("list/getLists", async () => {
  const res = await axios.get("/lists/all", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Delete List

export const deleteList = createAsyncThunk("list/deleteList", async (id) => {
  await axios.put(
    "/lists/unactive/" + id,
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

//Update List

export const updateList = createAsyncThunk(
  "list/updateList",
  async (newList) => {
    const res = await axios.put("/lists/" + newList._id, newList, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getLists.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Get list start!");
    },
    [getLists.fulfilled]: (state, action) => {
      state.lists = action.payload;
      state.isFetching = false;
      state.error = false;
      console.log("Get list success!");
    },
    [getLists.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Get list failure!");
    },

    [deleteList.pending]: (state, action) => {
      state.isFetching = true;
      state.error = false;
      console.log("Delete list start!");
    },
    [deleteList.fulfilled]: (state, action) => {
      state.lists = state.lists.filter((list) => list._id !== action.payload);
      state.isFetching = false;
      state.error = false;
      console.log("Delete list success!");
    },
    [deleteList.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = true;
      console.log("Delete list failure!");
    },
    [updateList.fulfilled]: (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload._id ? action.payload : list
      );
      console.log("Update list success!");
    },
  },
});

//Reducer

const listReducer = listSlice.reducer;

//Selector

export const listSelector = (state) => ({
  lists: state.listReducer.lists,
  isFetching: state.listReducer.isFetching,
  error: state.listReducer.error,
});

//Action export
export const {} = listSlice.actions;

export default listReducer;
