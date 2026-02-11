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
      WHERE is_bookable = true
    ),
    used_slot_per_day AS (
      SELECT
        booking_date,
        count(*)::int AS used_slots
      FROM booking_approved_slot
      WHERE booking_date BETWEEN ${startDate} AND ${endDate}
      GROUP BY booking_date
    )
    SELECT
      date_series.booking_date AS booking_date,
      round(
        (
          (room_count.total_rooms * ${TOTAL_SLOTS_PER_ROOM}
            - coalesce(used_slot_per_day.used_slots, 0)
          )::numeric
          / nullif((room_count.total_rooms * ${TOTAL_SLOTS_PER_ROOM}), 0)
        ) * 100,
        2
      ) AS available_percent
    FROM date_series
    CROSS JOIN room_count
    LEFT JOIN used_slot_per_day
      ON used_slot_per_day.booking_date = date_series.booking_date
    ORDER BY date_series.booking_date;
  `;

  return rows;
}
