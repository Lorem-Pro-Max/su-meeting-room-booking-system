import express from "express";
import { getAllRooms, getBuildingAvailability } from "./controller.js";

const router = express.Router();

router.get("/", getAllRooms);
router.get("/availability", getBuildingAvailability)

export default router;
