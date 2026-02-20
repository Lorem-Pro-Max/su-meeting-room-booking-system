import { api } from "./api";

export default async function getMyBookings() {
  try {
    const response = await api.get("/booking/my-booking");

    return response.data.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}
