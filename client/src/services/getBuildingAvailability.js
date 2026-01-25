const API_BASE = import.meta.env.VITE_API_BASE;

export default async function getBuildingAvailability (start_date,end_date) {
  const query = new URLSearchParams({
    start_date,
    end_date,
  }).toString();

  console.log("query", query)

  const res = await fetch(`${API_BASE}/rooms/availability?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch building availability");
  }

  const result = await res.json();
  return result.data; 
}
