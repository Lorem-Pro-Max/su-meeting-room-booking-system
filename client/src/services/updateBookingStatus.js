import { api } from "./api";

export async function updateBookingStatus({ bookingId, statusId, actionBy }) {
  const response = await api.patch(`/booking/${bookingId}/status`, {
    status_id: statusId,
    action_by: actionBy ?? null,
  });

  return response.data;
}
