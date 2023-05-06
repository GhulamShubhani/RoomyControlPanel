import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
  isLoggedIn: false,
  token: null,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    email(state, action) {
      state.email = action.payload;
    },
    password(state, action) {
      state.password = action.payload;
    },
    isLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    token(state, action) {
      state.token = action.payload;
    },
  },
});

export const LoginActions = LoginSlice.actions;

export default LoginSlice.reducer;
