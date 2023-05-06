import { Request, Response } from "express";
import Property from "../../Models/PropertyAdsModel";

export const EditPostProperty = async (req: Request, res: Response) => {
  try {
    const {
      id,
      // poster,
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

    console.log(deposit);

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res
        .status(400)
        .json({ message: "Property not exists", status: false });
    } else {
      existingProperty.set({
        //id: admin._id,
        //poster,
        type,
        quantity: +quantity,
        quantityTaken: +quantityTaken,
        preferedRentType,
        monthlyPrice: +monthlyPrice,
        weeklyPrice: +weeklyPrice,
        dailyPrice: +dailyPrice,
        deposit: deposit === "true",
        depositPrice: +depositPrice,
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
      });

      const updatedProperty = await existingProperty.save();

      return res.status(201).json({
        message: "Property updated successfully",
        property: updatedProperty,
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
