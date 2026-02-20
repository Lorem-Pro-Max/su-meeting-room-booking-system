import express from "express";
import { createIotSchedule } from "./controller.js";

const router = express.Router();

router.post("/", createIotSchedule);

export default router;
