import { findAllRooms } from "./repository.js";

export async function getAllRooms(req, res, next) {
  try {
    const rooms = await findAllRooms();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}
