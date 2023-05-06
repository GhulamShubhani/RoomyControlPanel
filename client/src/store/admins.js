import { createSlice } from "@reduxjs/toolkit";

const initialState = { admins: [], name: null, email: null, password: null };

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    admins(state, action) {
      state.admins = action.payload;
    },
    name(state, action) {
      state.name = action.payload;
    },
    email(state, action) {
      state.email = action.payload;
    },
    password(state, action) {
      state.password = action.payload;
    },
  },
});

export const AdminActions = AdminSlice.actions;

export default AdminSlice.reducer;
