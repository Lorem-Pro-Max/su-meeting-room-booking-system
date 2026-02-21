import { api } from "./api";

export const createBooking = async (payload) => {
  const response = await api.post("/booking", payload);
  return response.data;
};
