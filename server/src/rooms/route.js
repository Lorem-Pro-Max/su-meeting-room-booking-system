import express from "express";
import { getAllRooms } from "./controller.js";

const router = express.Router();

router.get("/", getAllRooms);

export default router;
