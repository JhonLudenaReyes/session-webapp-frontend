import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  verification: false,
};

export const createPerson = createAsyncThunk(
  "person/create",
  async ({ name, lastName, email, cellPhone }) => {
    const res = await axios.post(`http://127.0.0.1:4449/people`, {
      name,
      lastName,
      email,
      cellPhone,
    });
    return res.data;
  }
);

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    // add your non-async reducers here
    changeState: (state, action) => {
      state.verification = action.payload;
    },
  },
  extraReducers: {
    // add your async reducers here
    [createPerson.fulfilled]: (state) => {
      state.verification = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeState } = personSlice.actions;

export default personSlice.reducer;
