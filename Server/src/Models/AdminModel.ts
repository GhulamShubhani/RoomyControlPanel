import { Schema, model } from "mongoose";
import { IAdmin } from "./interface";

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  fcmToken: { type: String },
});

const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;
