import { insertIotSchedule } from "./repository.js";

export async function createIotSchedule(req, res, next) {
  try {
    const { booking_id, room_id, action_time, action } = req.body;

    const action_by = req.user.id;
    if (!room_id || !action_time || !action) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const schedules = await insertIotSchedule({
      booking_id,
      room_id,
      action_by,
      action_time,
      action,
    });

    res.status(201).json(schedules);
  } catch (err) {
    next(err);
  }
}
