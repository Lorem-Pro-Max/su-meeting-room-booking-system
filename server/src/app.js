import express from "express";
import cors from "cors";
import "dotenv/config";
import roomRouter from "./rooms/route.js"
import bookingRouter from "./bookings/route.js" 

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/rooms", roomRouter);
app.use("/api/booking", bookingRouter)

export default app;
