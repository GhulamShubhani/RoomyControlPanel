import { Document, HydratedDocument } from "mongoose";

export interface ILandLord extends Document {
  firstName: String;
  lastName: String;
  gender: String;
  email: String;
  password: String;
  phone: String;
  country: String;
  fcmToken: String;
}

export interface IAdmin extends Document {
  name: String;
  email: String;
  password: String;
  token: String;
  fcmToken: String;
}

type PropertyAdSubType = "Bed" | "Partition" | "Room" | "Master Room" | "Mix";

export interface IProperty extends Document {
  id: string;
  poster: HydratedDocument<IAdmin>;
  type: PropertyAdSubType;
  quantity: number;
  quantityTaken: number;
  preferedRentType: "Monthly" | "Weekly" | "Daily";
  monthlyPrice: number;
  weeklyPrice: number;
  dailyPrice: number;
  deposit: boolean;
  depositPrice?: number;
  description: string;

  posterType: "Landlord" | "Agent/Broker";
  address: {
    city: string;
    location: string;
    buildingName: string;
    appartmentNumber: string;
    floorNumber: string;
  };

  images: string[];
  videos: string[];
  amenities: string[];
  agentInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  socialPreferences: {
    numberOfPeople: string;
    gender: "Male" | "Female" | "Mix";
    grouping: "Single" | "Couple";
    nationality: string;
    smoking: boolean;
    drinking: boolean;
    visitors: boolean;
    cooking: boolean;
  };

  readonly createdAt: Date;
  ratings: {
    raterId: string;
    score: number;
    comment?: string;
    rateName: string;
  }[];
  shareLink?: string; // dynamic link for sharing
}
