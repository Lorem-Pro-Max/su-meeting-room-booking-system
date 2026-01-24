import express from "express";
import {
  getAllBookings,
  getBookingOnDate,
  getMyBooking,
  createBooking,
  updateStatus
} from "./controller.js";

const router = express.Router();

router.get("/", getAllBookings);                 // calendar
router.get("/date/:date", getBookingOnDate);     // booking ทั้งวัน
router.get("/me", getMyBooking);                 // ของฉัน
router.post("/", createBooking);                 // create
router.patch("/:id/status", updateStatus);       // cancel / checkin / admin

export default router;
