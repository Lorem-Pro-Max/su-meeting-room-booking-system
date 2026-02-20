import { api } from "./api";

export const createIotSchedule = async (payload) => {
  const response = await api.post("/iot", payload);
  return response.data;
};
