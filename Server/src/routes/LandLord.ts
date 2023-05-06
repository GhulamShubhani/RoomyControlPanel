import express from "express";
import { AddLandLord } from "../Controllers/landlords/AddLandLord.controller";
import { EditLandLord } from "../Controllers/landlords/EditLandLord.controller";
import { viewLandLords } from "../Controllers/landlords/ViewLandLord.controller";
import { GetLandlord } from "../Controllers/landlords/Landlord.controller";

const router = express.Router();

router.get("/allLandLords", viewLandLords);
router.post("/getLandlord", GetLandlord);
router.post("/addLandLord", AddLandLord);
router.post("/editLandLord", EditLandLord);

export default router;
