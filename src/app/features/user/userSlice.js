import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  verification: false,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersList: async (state) => {
      await axios
        .get(`http://127.0.0.1:4449/users`)
        .then((resp) => {
          state.users.push(resp.data);
        })
        .catch((error) => console.log(error));
    },
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
    changeState: (state, action) => {
      state.verification = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, changeState, getUsersList } = userSlice.actions;

export default userSlice.reducer;
