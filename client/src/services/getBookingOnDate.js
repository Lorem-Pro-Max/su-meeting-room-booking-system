
const API_BASE = import.meta.env.VITE_API_BASE;

export async function getBookingOnDate(date) {
  const res = await fetch(`${API_BASE}/booking/date/${date}`); 

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const result = await res.json();
  return result.data; 
}