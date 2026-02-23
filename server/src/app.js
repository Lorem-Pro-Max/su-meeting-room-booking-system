import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ต้องเพิ่มตัวนี้เพื่ออ่านคุกกี้
import "dotenv/config";
import roomRouter from "./rooms/route.js";
import bookingRouter from "./bookings/route.js";
import authRoute from "./auth/route.js";
import iotRoute from "./iot/route.js";
import { authenticate } from "./middleware/authMiddleware.js";

const app = express();
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:8794", // เพิ่มพอร์ตที่เรารันจริง
      "http://localhost:5173", // ของเดิมเวลารัน dev mode
    ].filter(Boolean),
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(">>>", req.method, req.url);
  next();
});

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/auth", authRoute);

app.use("/rooms", authenticate, roomRouter);
app.use("/booking", authenticate, bookingRouter);
app.use("/iot", authenticate, iotRoute);

export default app;
