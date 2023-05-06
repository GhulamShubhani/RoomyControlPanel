import { Request, Response } from "express";
import Admin from "../../Models/AdminModel";

export const ViewAdmins = async (req: Request, res: Response) => {
  try {
    const allAdmins = await Admin.find();

    return res
      .status(200)
      .json({ message: "all admins", admins: allAdmins, status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
