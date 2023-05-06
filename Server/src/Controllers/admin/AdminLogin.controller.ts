import { Request, Response } from "express";
import Admin from "../../Models/AdminModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const AdminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const adminLogin: any = await Admin.findOne({ email });

    const validPassword = await bcrypt.compare(password, adminLogin.password);

    if (!adminLogin) {
      return res.status(401).json({
        message: "Invalid credentials",
        status: false,
      });
    } else if (!validPassword) {
      return res.status(401).json({
        message: "Please enter valid credentials",
        status: false,
      });
    }
    const token = jwt.sign({ email }, "gscControlPanel");
    return res.status(200).json({
      message: "Login successful",
      status: true,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
