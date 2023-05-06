import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landlords: [],
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  phone: null,
  gender: null,
  country: null,
  edit: false,
  id: null,
  editedData: [],
};

const LandlordSlice = createSlice({
  name: "landlord",
  initialState,
  reducers: {
    landlords(state, action) {
      state.landlords = action.payload;
    },
    firstName(state, action) {
      state.firstName = action.payload;
    },
    lastName(state, action) {
      state.lastName = action.payload;
    },
    email(state, action) {
      state.email = action.payload;
    },
    password(state, action) {
      state.password = action.payload;
    },
    phone(state, action) {
      state.phone = action.payload;
    },
    gender(state, action) {
      state.gender = action.payload;
    },
    country(state, action) {
      state.country = action.payload;
    },
    edit(state, action) {
      state.edit = action.payload;
    },
    editedData(state, action) {
      state.landlords = action.payload.landlords;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.country = action.payload.country;
      state.id = action.payload._id;

      console.log(state.lastName);
    },
    clearEditedData(state, action) {
      state.landlords = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.password = null;
      state.phone = null;
      state.gender = null;
      state.country = null;
      state.id = null;
    },
  },
});

export const LandlordActions = LandlordSlice.actions;

export default LandlordSlice.reducer;
