import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  errorStatus: false,
  messageError: "",
  user: {},
};

export const loginUser = createAsyncThunk(
  "user/session-login",
  async (user) => {
    const res = await axios.post(
      `http://127.0.0.1:4449/users/session/login`,
      user
    );

    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
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
      console.log(action);
      if (action.payload.userId) {
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        (state.errorStatus = true), (state.messageError = action.payload);
      }
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
