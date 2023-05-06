import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";

export const EditLandLord = async (req: Request, res: Response) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    country,
    fcmToken,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !gender ||
    !phone ||
    !country ||
    !fcmToken ||
    !email ||
    !password
  ) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  try {
    const existingLandLord = await LandLord.findById(id);

    if (existingLandLord) {
      existingLandLord.firstName = firstName;
      existingLandLord.lastName = lastName;
      existingLandLord.email = email;
      existingLandLord.password = password;
      existingLandLord.gender = gender;
      existingLandLord.phone = phone;
      existingLandLord.country = country;
      existingLandLord.fcmToken = fcmToken;

      const editedLandLord = await existingLandLord.save();

      return res.status(201).json({
        message: "landLord edited successfully",
        status: true,
        LandLord: editedLandLord,
      });
    } else {
      return res
        .status(409)
        .json({ message: "LandLord not found", status: false });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }

};
