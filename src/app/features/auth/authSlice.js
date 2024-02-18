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
    const res = await axios
      .get(
        `http://localhost:8080/session/web-service/api/users/session-login?user=${user.user}&password=${user.password}`
      )
      .then(console.log("¡Su usuario y/o contraseña son incorrectos!"));

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
    changeErrorStatus: (state, action) => {
      state.errorStatus = action.payload;
    },
  },
  extraReducers: {
    // add your async reducers here
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.userId) {
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        (state.errorStatus = true),
          (state.messageError = "¡Su usuario y/o contraseña son incorrectos!");
      }
    },
  },
});

export const { logoutUser, changeErrorStatus } = authSlice.actions;

export default authSlice.reducer;
