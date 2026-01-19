import { findAllRooms } from "./repository.js";

export async function getAllRooms() {
    return findAllRooms();
  }