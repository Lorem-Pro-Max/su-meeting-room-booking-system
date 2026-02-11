import { api } from "./api";

export default async function getBuildingAvailability(start_date, end_date) {
  const response = await api.get("/rooms/availability", {
    params: {
      start_date,
      end_date,
    },
  });

  return response.data;
}
