import { api } from "./api";

export async function updateBookingStatus({
  bookingId,
  statusId,
  actionBy,
  reason,
}) {
  const response = await api.patch(`/booking/${bookingId}/status`, {
    status_id: statusId,
    action_by: actionBy ?? null,
    reason: reason ?? null,
  });

  return response.data;
}
