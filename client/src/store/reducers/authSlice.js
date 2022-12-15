import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";
import axios from "axios";
import jwt_decode from "jwt-decode";

//Reducer Thunk
export const login = createAsyncThunk("auth/login", async (user) => {
  const res = await axios.post("auth/login", user);
  return res.data;
});
export const checkActive = createAsyncThunk("auth/checkActive", async () => {
  const res = await apiClient.get("order/find");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
    isActive: false,
  },
  reducers: {
    //logout
    logout(state, action) {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      state.isFetching = false;
      state.error = false;
    },
    //set user
    setUser(state, action) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const decodedToken = jwt_decode(user.accessToken);
        const currentDate = new Date();
        if (decodedToken.exp * 1000 > currentDate.getTime()) state.user = user;
      }
    },
  },
  extraReducers: {
    //login

    [login.pending]: (state, action) => {
      state.user = null;
      state.isFetching = true;
      state.error = false;
      console.log("Login start!");
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
      console.log("Login success!");
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.isFetching = false;
      state.error = true;
      console.log("Login failure!");
      console.log(action.payload);
    },
    [checkActive.fulfilled]: (state, action) => {
      const orders = action.payload;
      if (orders.length > 0) {
        state.isActive = true;
        console.log("Account is active");
      }
    },
  },
});

//Reducer

const authReducer = authSlice.reducer;

//Selector

export const authSelector = (state) => ({
  user: state.authReducer.user,
  isFetching: state.authReducer.isFetching,
  error: state.authReducer.error,
  isActive: state.authReducer.isActive,
});

//Action export
export const { logout, setUser } = authSlice.actions;

export default authReducer;
