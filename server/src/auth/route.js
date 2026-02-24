import express from "express";
import { login, logout, refreshToken } from "./controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshToken);

export default router;
