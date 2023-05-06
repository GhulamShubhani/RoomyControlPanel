import { Request, Response } from "express";
import AdminModel from "../../Models/AdminModel";
import bcrypt from "bcrypt";

export const AdminSignupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide name, email, and password",
      status: false,
    });
  }
  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin with this email already exists",
        status: false,
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the new admin
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
    });
    newAdmin.save();

    return res.status(201).json({
      message: "Admin signup successful",
      admin: newAdmin,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
