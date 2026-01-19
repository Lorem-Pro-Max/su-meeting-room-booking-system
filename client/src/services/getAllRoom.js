const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllRooms() {
  const res = await fetch(`${API_BASE}/rooms`);
  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return res.json();
}
