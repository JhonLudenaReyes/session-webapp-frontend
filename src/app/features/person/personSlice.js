import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  verification: false,
  person: {},
};

export const createPerson = createAsyncThunk(
  "person/create",
  async ({
    name,
    lastName,
    identificationCard,
    ruc,
    email,
    cellPhone,
    address,
  }) => {
    const personResp = await axios.post(
      `http://localhost:8080/session/web-service/api/people/person-save`,
      {
        name,
        lastName,
        identificationCard,
        ruc,
        email,
        cellPhone,
        address,
      }
    );

    return personResp.data;
  }
);

export const createUser = createAsyncThunk(
  "user/create",
  async ({ personId, roleId, user, password }) => {
    await axios.post(
      `http://localhost:8080/session/web-service/api/users/save-user`,
      {
        personId,
        roleId,
        user,
        password,
      }
    );
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
    changePersonState: (state, action) => {
      state.person = action.payload;
    },
  },
  extraReducers: {
    // add your async reducers here
    [createPerson.fulfilled]: (state, action) => {
      state.person = action.payload;
    },
    [createUser.fulfilled]: (state) => {
      state.verification = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeState, changePersonState } = personSlice.actions;

export default personSlice.reducer;
