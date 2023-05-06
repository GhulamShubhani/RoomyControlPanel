import { Request, Response } from "express";
import Property from "../../Models/PropertyAdsModel";

export const GetProperty = async (req: Request, res: Response) => {
  const { id } = req.body;
  const property = await Property.findById(id);

  return res
    .status(200)
    .json({ message: "landlord fetched", property, status: true });
  try {
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
