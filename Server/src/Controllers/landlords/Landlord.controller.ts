import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";

export const GetLandlord = async (req: Request, res: Response) => {
  const { id } = req.body;
  const landlord = await LandLord.findById(id);

  return res
    .status(200)
    .json({ message: "landlord fetched", landlord, status: true });
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
