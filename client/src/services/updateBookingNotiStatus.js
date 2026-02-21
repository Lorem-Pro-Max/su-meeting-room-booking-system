import { api } from "./api";

export async function updateBookingNotiStatus(bookingId, status) {
  const response = await api.patch(`/booking/${bookingId}/noti-status`, {
    status: status,
  });

  return response.data;
}
