import { Schema, Types, model } from "mongoose";
import { IProperty } from "./interface";

const propertySchema = new Schema({
  id: { type: Types.ObjectId },
  poster: { type: Types.ObjectId, ref: "Admin" },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  quantityTaken: { type: Number, required: true },
  preferedRentType: { type: String, required: true },
  monthlyPrice: { type: Number, required: true },
  weeklyPrice: { type: Number, required: true },
  dailyPrice: { type: Number, required: true },
  deposit: { type: Boolean, required: true },
  depositPrice: { type: Number },
  description: { type: String, required: true },
  posterType: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    location: { type: String, required: true },
    buildingName: { type: String, required: true },
    appartmentNumber: { type: String, required: true },
    floorNumber: { type: String, required: true },
  },
  images: [{ type: String }],
  videos: [{ type: String }],
  amenities: [{ type: String }],
  agentInfo: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  socialPreferences: {
    numberOfPeople: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Mix"], required: true },
    grouping: { type: String, enum: ["Single", "Couple"], required: true },
    nationality: { type: String, required: true },
    smoking: { type: Boolean, required: true },
    drinking: { type: Boolean, required: true },
    visitors: { type: Boolean, required: true },
    cooking: { type: Boolean, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  ratings: {
    raterId: { type: String },
    score: { type: String },
    comment: { type: String },
    rateName: { type: String },
  },
  shareLink: { type: String },
});

const Property = model<IProperty>("PropertyAds", propertySchema);

export default Property;
