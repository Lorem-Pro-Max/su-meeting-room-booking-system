import sql from "../../db.js";

export async function findAllRooms() {
  const rooms = await sql`
  SELECT
    room.id,
    room.title,
    room.floor,
    room.building_id,
    building.name AS building_name,
    room.created_at
  FROM room
  LEFT JOIN building
    ON building.id = room.building_id
  WHERE is_bookable = true
  ORDER BY room.floor, room.id
`;

  return rooms;
}

export async function findBuildingAvailabilityByDateRange(startDate, endDate) {
  const TOTAL_SLOTS_PER_ROOM = 26;
  const SECONDS_PER_SLOT = 1800; // 30 นาทีต่อ 1 slot

  const rows = await sql`
    WITH date_series AS (
      SELECT generate_series(
        ${startDate}::date,
        ${endDate}::date,
        interval '1 day'
      )::date AS booking_date
    ),
    room_count AS (
      SELECT count(*)::int AS total_rooms
      FROM room
      WHERE is_bookable = true -- หรือเงื่อนไขที่คุณใช้ระบุห้องที่เปิดใช้
    ),
    -- คำนวณจำนวน Slot ที่ถูกใช้ไปในแต่ละวันจากตาราง room_booking
    used_slot_per_day AS (
      SELECT
        booking_date,
        SUM(
          EXTRACT(EPOCH FROM ("end_dateTime" - "start_dateTime")) / ${SECONDS_PER_SLOT}
        )::int AS used_slots
      FROM public.room_booking
      WHERE 
        booking_date BETWEEN ${startDate} AND ${endDate}
        AND status_id NOT IN (3, 4) -- สมมติ 3=Cancelled, 4=Rejected (ปรับตามจริง)
      GROUP BY booking_date
    )
    SELECT
      ds.booking_date,
      round(
        (
          (rc.total_rooms * ${TOTAL_SLOTS_PER_ROOM} - coalesce(usd.used_slots, 0))::numeric
          / nullif((rc.total_rooms * ${TOTAL_SLOTS_PER_ROOM}), 0)
        ) * 100,
        2
      ) AS available_percent
    FROM date_series ds
    CROSS JOIN room_count rc
    LEFT JOIN used_slot_per_day usd ON usd.booking_date = ds.booking_date
    ORDER BY ds.booking_date;
  `;

  return rows;
}
