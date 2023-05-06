import { Request, Response } from "express";
import LandLord from "../../Models/LandLordModel";
import Property from "../../Models/PropertyAdsModel";
import { authenticate, AuthenticatedRequest } from "../../middleware/Auth";

export const PostProperty = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    let {
      type,
      quantity,
      quantityTaken,
      preferedRentType,
      monthlyPrice,
      weeklyPrice,
      dailyPrice,
      deposit,
      depositPrice,
      description,
      posterType,
      address,
      images,
      videos,
      amenities,
      agentInfo,
      socialPreferences,
      createdAt,
      ratings,
      shareLink,
    } = req.body;

    const admin = req.admin;

    quantity = +quantity;
    quantityTaken = +quantityTaken;
    monthlyPrice = +monthlyPrice;
    weeklyPrice = +weeklyPrice;
    dailyPrice = +dailyPrice;
    depositPrice = +depositPrice;
    deposit = deposit === "true";

    const user = await LandLord.findOne({ email: agentInfo.email });

    console.log(admin);
    const poster = { _id: admin?._id, name: admin?.name, email: admin?.email };
    if (!user) {
      return res
        .status(400)
        .json({ message: "Landlord not exists", status: false });
    } else {
      const property = new Property({
        type,
        quantity,
        quantityTaken,
        preferedRentType,
        monthlyPrice,
        weeklyPrice,
        dailyPrice,
        deposit,
        depositPrice,
        description,
        poster,
        posterType,
        address,
        images,
        videos,
        amenities,
        agentInfo,
        socialPreferences,
        createdAt,
        ratings,
        shareLink,
      });

      property.save();
      console.log("saved");

      return res.status(201).json({
        message: "Property posted successfully",
        property,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
