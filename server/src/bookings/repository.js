import sql from "../../db.js";

/* calendar / get all booking (range) */
export async function findBookingsRange(from, to) {
  return sql`
    SELECT *
    FROM room_booking
    WHERE booking_date BETWEEN ${from} AND ${to}
      AND status_id NOT IN (3, 4)
    ORDER BY "start_dateTime"
  `;
}

/* booking ทั้งหมดในวัน */
export async function findBookingsOnDate(date) {
  return sql`
      SELECT 
        room_booking.*, 
        "user".firstname, 
        "user".lastname, 
        room.title AS room_title, 
        room.floor As floor,
        building.name AS building_name,
        booking_status.status AS booking_status
      FROM room_booking
      INNER JOIN "user" ON room_booking.requester_id = "user".id
      INNER JOIN room ON room_booking.room_id = room.id
      INNER JOIN building ON room.building_id = building.id
      INNER JOIN booking_status ON room_booking.status_id = booking_status.id
      WHERE room_booking.booking_date = ${date}
      ORDER BY room_booking."start_dateTime" ASC
    `;
}

/* booking ของฉัน */
export async function findMyBookings(requesterId) {
  return sql`
    SELECT 
      rb.id,
      rb.meeting_name,
      rb.room_id,
      rb.requester_id,
      rb.phone,
      rb."start_dateTime" AS start_datetime,
      rb."end_dateTime" AS end_datetime,
      rb.booking_date,
      rb.created_at,
      rb.status_id,
      rb.is_notified,
      bs.status AS booking_status,
      u.firstname,
      u.lastname,
      r.title,
      r.floor
    FROM room_booking rb
    LEFT JOIN booking_status bs
      ON rb.status_id = bs.id
    LEFT JOIN "user" u
      ON rb.requester_id = u.id
    LEFT JOIN room r
      ON rb.room_id = r.id
    WHERE rb.requester_id = ${requesterId}
      AND rb.booking_date >= CURRENT_DATE - INTERVAL '6 months'
    ORDER BY rb.booking_date DESC, rb."start_dateTime" DESC
  `;
}

/* create booking */
export async function insertBooking(data) {
  const [row] = await sql`
    INSERT INTO room_booking (
      meeting_name,
      room_id,
      requester_id,
      phone,
      booking_date,
      "start_dateTime",
      "end_dateTime",
      status_id
    )
    VALUES (
      ${data.meeting_name},
      ${data.room_id},
      ${data.requester_id},
      ${data.phone},
      ${data.booking_date},
      ${data.start_dateTime},
      ${data.end_dateTime},
      1 -- pending
    )
    RETURNING *
  `;
  return row;
}

/* update status (admin / user) */
export async function updateBookingStatus(id, statusId, actionBy, reason) {
  const [row] = await sql`
    UPDATE room_booking
    SET
      status_id = ${statusId},
      action_by = ${actionBy},
      action_date = NOW(),
      reason = ${reason}
    WHERE id = ${id}
    RETURNING *
  `;
  return row;
}

export async function updateBookingNotiStatus(id, status, userId) {
  const [row] = await sql`
    UPDATE room_booking
    SET
      is_notified = ${status.status}
    WHERE id = ${id} AND requester_id = ${userId}
  `;
  return row;
}
