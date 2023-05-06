import express from "express";
import { ViewAdmins } from "../Controllers/admin/ViewAdmins.controller";
import { AdminLoginController } from "../Controllers/admin/AdminLogin.controller";
import { AdminSignupController } from "../Controllers/admin/AdminSingup.controller";

const router = express.Router();

router.get("/allAdmins", ViewAdmins);
router.post("/adminSignup", AdminSignupController);
router.post("/adminLogin", AdminLoginController);

export default router;
