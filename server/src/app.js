import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ต้องเพิ่มตัวนี้เพื่ออ่านคุกกี้
import "dotenv/config";
import roomRouter from "./rooms/route.js"
import bookingRouter from "./bookings/route.js" 
import authRoute from "./auth/route.js";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // URL ของฝั่ง React
    credentials: true // อนุญาตให้รับ-ส่ง Cookie และ Authorization Header
  }));
  
  app.use(cookieParser());
  app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/rooms", roomRouter);
app.use("/api/booking", bookingRouter)
app.use("/api/auth", authRoute);

export default app;
