import { Request, Response } from "express";
import Admin from "../../Models/AdminModel";

export const ViewAdmins = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    return res.status(200).json({ message: "all admins", admin, status: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
