import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  verification: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      console.log(action);
      axios
        .post(`http://127.0.0.1:4449/users`, action.payload)
        .then((res) => {
          state.verification = true;
          console.log("Sus datos han sido guardados con exito");
        })
        .catch((error) => console.log(error));
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser } = userSlice.actions;

export default userSlice.reducer;
