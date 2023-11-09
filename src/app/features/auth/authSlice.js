import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  authStatus: false,
  user: {},
};

export const loginUser = createAsyncThunk(
  "user/session-login",
  async (user) => {
    const res = await axios.post(
      `http://127.0.0.1:4449/users/session/login`,
      user
    );

    if (res.status == 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      // Remove token from local storage
      localStorage.removeItem("user");
      state.user = {};
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {
    // add your async reducers here
    [loginUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
