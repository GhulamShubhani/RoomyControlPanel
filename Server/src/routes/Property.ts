import express from "express";
import { PostProperty } from "../Controllers/property/PostPropertyAd.controller";
import { ViewProperty } from "../Controllers/property/ViewPropertyAd.controller";
import { GetProperty } from "../Controllers/property/getProperty.controller";
import { authenticate } from "../middleware/Auth";
import { EditPostProperty } from "../Controllers/property/EditPropertyAd.controller";

const router = express();

router.post("/postProperty", authenticate, PostProperty);
router.get("/allProperties", ViewProperty);
router.post("/getProperty", GetProperty);
router.post("/editProperty", authenticate, EditPostProperty);

export default router;
