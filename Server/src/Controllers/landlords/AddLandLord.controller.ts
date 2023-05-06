import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";

export const AddLandLord = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone, gender, country } =
    req.body;
  if (
    !firstName &&
    !lastName &&
    !email &&
    !password &&
    !phone &&
    !gender &&
    !country
  ) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  try {
    const ExistingLandLord = await LandLord.findOne({ email });

    if (ExistingLandLord) {
      return res.status(409).json({
        message: "LandLord with this email already exists",
        status: false,
      });
    } else {
      const newLandLord = new LandLord({
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        country,
      });
      newLandLord.save();

      return res.status(201).json({
        message: "landLord created successfully",
        status: true,
        LandLord: newLandLord,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
