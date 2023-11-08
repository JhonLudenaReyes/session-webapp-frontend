import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./features/person/personSlice";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    person: personReducer,
  },
});
