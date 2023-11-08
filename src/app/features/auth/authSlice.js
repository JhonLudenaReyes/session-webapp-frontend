import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const loginUser = createAsyncThunk(
  "user/session-login",
  async (user) => {
    const res = await axios.get(
      `http://127.0.0.1:4449/users/session/login`,
      user
    );
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // add your async reducers here
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
