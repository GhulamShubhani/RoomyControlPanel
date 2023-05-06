import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";

export const viewLandLords = async (req: Request, res: Response) => {
  try {
    const landLords = await LandLord.find();
    return res
      .status(200)
      .json({ message: "All landLords are fetched", landLords, status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
