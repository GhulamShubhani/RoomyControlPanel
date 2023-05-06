import { Request, Response, NextFunction } from "express";
import Admin from "../Models/AdminModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAdmin } from "../Models/interface";

export interface AuthenticatedRequest extends Request {
  admin?: IAdmin;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;
    token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    const userToken = jwt.verify(token, "gscControlPanel") as JwtPayload;

    const admin = await Admin.findOne({ email: userToken.email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
