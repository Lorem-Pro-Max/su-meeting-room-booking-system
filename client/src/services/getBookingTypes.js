import { api } from "./api";

async function getBookingTypes() {
  const response = await api.get("/booking/types");
  return response.data?.data ?? [];
}

export default getBookingTypes;
