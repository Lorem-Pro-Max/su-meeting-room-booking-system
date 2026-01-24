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
  ORDER BY room.floor, room.id
`;

return rooms;
}