import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../apiClient";

//Reducer Thunk
export const getRandomLists = createAsyncThunk(
  "lists/getRandomLists",
  async ({ type, genre }) => {
    try {
      const res = await axios.get(
        `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get list recommend

export const getListRecommend = createAsyncThunk(
  "lists/getListRecommend",
  async () => {
    try {
      const res = await axios.get("recommend/findByUser");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get list trending

export const getListTrending = createAsyncThunk(
  "lists/getListTrending",
  async () => {
    try {
      const res = await axios.get("trending/find");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    listRecommend: [],
    listTrending: [],
  },
  reducers: {},
  extraReducers: {
    //getRandomLists
    [getRandomLists.fulfilled]: (state, action) => {
      state.lists = action.payload;
    },
    //getListRecommend
    [getListRecommend.fulfilled]: (state, action) => {
      state.listRecommend = action.payload;
    },
    //getListTrending
    [getListTrending.fulfilled]: (state, action) => {
      state.listTrending = action.payload;
    },
  },
});

//Reducer

const listsReducer = listsSlice.reducer;

//Selector

export const listsSelector = (state) => ({
  lists: state.listsReducer.lists,
  listRecommend: state.listsReducer.listRecommend,
  listTrending: state.listsReducer.listTrending,
});

//Action export
export const {} = listsSlice.actions;

export default listsReducer;
