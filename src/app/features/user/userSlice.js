import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  verification: false,
  user: {},
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      axios
        .post(`http://127.0.0.1:4449/users`, action.payload)
        .then((res) => {
          if (res.status == 200) {
            state.verification = true;
            console.log("Sus datos han sido guardados con exito");
          }
        })
        .catch((error) => console.log(error));
    },
    editUser: (state, action) => {
      const { userId, user, password } = action.payload;
      axios
        .put(`http://127.0.0.1:4449/users/${userId}`, {
          userId,
          user,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            state.user = {};
            state.verification = true;
            console.log("Sus datos han sido actualizados con exito");
          }
        })
        .catch((error) => console.log(error));
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    changeState: (state, action) => {
      state.verification = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, changeState, getUsersList, addUser, editUser } =
  userSlice.actions;

export default userSlice.reducer;
