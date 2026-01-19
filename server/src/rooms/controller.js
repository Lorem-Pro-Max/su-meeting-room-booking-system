import { getAllRooms } from "./service.js";

export async function getAllRoomsController(req, res, next) {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}
