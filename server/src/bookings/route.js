import express from "express";
import {
  getAllBookings,
  getBookingOnDate,
  getMyBooking,
  getBookingTypes,
  createBooking,
  updateStatus,
  updateNotiStatus,
} from "./controller.js";

const router = express.Router();

router.get("/", getAllBookings); // calendar
router.get("/date/:date", getBookingOnDate); // booking ทั้งวัน
router.get("/my-booking", getMyBooking); // ของฉัน
router.get("/types", getBookingTypes);
router.post("/", createBooking); // create
router.patch("/:id/status", updateStatus); // cancel / checkin / admin
router.patch("/:id/noti-status", updateNotiStatus);

export default router;
