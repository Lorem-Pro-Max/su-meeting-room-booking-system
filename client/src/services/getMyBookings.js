import { api } from "./api";

export default async function getMyBookings(requester_id) {
  const response = await api.get("/booking/my-booking", {
    params: {
      requester_id: requester_id,
    },
  });
  return response.data.data;
}
