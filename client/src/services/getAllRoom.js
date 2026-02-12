import { api } from "./api";

async function getAllRooms() {
  const response = await api.get("/rooms");
  return response.data;
}

export default getAllRooms;
