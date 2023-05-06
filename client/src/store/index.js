import { configureStore } from "@reduxjs/toolkit";
import userLogin from "./userLogin";
import admin from "./admins";
import panel from "./panel";
import Landlords from "./Landlords";
import Property from "./Property";

const store = configureStore({
  reducer: {
    login: userLogin,
    admin: admin,
    panel: panel,
    landlord: Landlords,
    property: Property,
  },
});

export default store;
