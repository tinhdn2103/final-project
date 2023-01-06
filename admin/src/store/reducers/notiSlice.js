import { createSlice } from "@reduxjs/toolkit";

//Reducer Thunk

const notiSlice = createSlice({
  name: "noti",
  initialState: {
    listNoti: [],
  },
  reducers: {
    //add notification
    addNoti(state, action) {
      state.listNoti.push(action.payload);
    },
    //remove notification
    removeNoti(state, action) {
      state.listNoti = state.listNoti.filter(
        (noti) => noti.id !== action.payload
      );
    },
  },
});

//Reducer

const notiReducer = notiSlice.reducer;

//Selector

export const notiSelector = (state) => ({
  listNoti: state.notiReducer.listNoti,
});

//Action export
export const { addNoti, removeNoti } = notiSlice.actions;

export default notiReducer;
