import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Reducer Thunk
//Get Users
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const res = await axios.get("/users", {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  return res.data;
});

//Create User
export const createUser = createAsyncThunk("user/createUser", async (user) => {
  const res = await axios.post("/auth/register", user, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
});

//Delete User

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete("/users/" + id, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return id;
});

//Update User

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (newUser) => {
    const res = await axios.put("/users/" + newUser._id, newUser, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      console.log("Get users success!");
    },

    [createUser.fulfilled]: (state, action) => {
      state.users.push(action.payload);
      console.log("Create user success!");
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      console.log("Delete user success!");
    },

    [updateUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      console.log("Update user success!");
    },
  },
});

//Reducer

const userReducer = userSlice.reducer;

//Selector

export const userSelector = (state) => state.userReducer.users;

//Action export
export const {} = userSlice.actions;

export default userReducer;
