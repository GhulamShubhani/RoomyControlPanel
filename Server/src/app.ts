import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import adminRouter from "./routes/Admin";
import LandLordRouter from "./routes/LandLord";
import PropertyRouter from "./routes/Property";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use(adminRouter);
app.use(LandLordRouter);
app.use(PropertyRouter);

mongoose.connect("mongodb://127.0.0.1:27017/gscControlpanel").then(() => {
  app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);
  });
});
