import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";
import Property from "../../Models/PropertyAdsModel";

export const ViewProperty = async (req: Request, res: Response) => {
  try {
    const allProperties = await Property.find();

    return res.status(200).json({
      message: "All available properties are fetched",
      properties: allProperties,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
};
