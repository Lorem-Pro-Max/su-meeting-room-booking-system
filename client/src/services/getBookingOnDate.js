import { api } from "./api";

export default async function getBookingOnDate(date) {
  const response = await api.get(`/booking/date/${date}`);
  return response.data.data;
}
