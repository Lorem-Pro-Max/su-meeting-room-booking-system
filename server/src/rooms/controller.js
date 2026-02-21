import { findAllRooms, findBuildingAvailabilityByDateRange } from "./repository.js";

export async function getAllRooms(req, res, next) {
  try {
    const rooms = await findAllRooms();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}

export async function getBuildingAvailability(req, res) {
  try {
    const { start_date: startDate, end_date: endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "start_date and end_date are required (YYYY-MM-DD)",
      });
    }

    const availabilityByDay = await findBuildingAvailabilityByDateRange(startDate, endDate);

    return res.json({
      start_date: startDate,
      end_date: endDate,
      data: availabilityByDay.map((row) => ({
        date: row.booking_date,
        available_percent: Number(row.available_percent),
      })),
    });
  } catch (error) {
    console.error("getBuildingAvailabilityCalendar error:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}