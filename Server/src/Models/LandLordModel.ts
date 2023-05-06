import { Document, Schema, model } from "mongoose";
import { ILandLord } from "./interface";

const landlordSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  fcmToken: { type: String, required: true, default: "123" },
});

const LandLord = model<ILandLord>("landlord", landlordSchema);

export default LandLord;
