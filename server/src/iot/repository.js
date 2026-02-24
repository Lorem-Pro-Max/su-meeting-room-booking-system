import sql from "../../db.js";

export async function insertIotSchedule({
  booking_id,
  room_id,
  action_by,
  action_time,
  action,
}) {
  const result = await sql`
      INSERT INTO iot_schedule
      (booking_id, device_id, action_by, action_time, action)
      SELECT
        ${booking_id ?? null},
        rd.id,
        ${action_by},
        ${action_time},
        ${action}
      FROM room_device rd
      WHERE rd.room_id = ${room_id}
      RETURNING *
    `;

  if (result.length === 0) {
    throw new Error("No devices found for this room");
  }

  return result;
}
