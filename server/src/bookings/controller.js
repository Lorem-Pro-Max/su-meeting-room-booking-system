import {
  findBookingsRange,
  findBookingsOnDate,
  findMyBookings,
  insertBooking,
  updateBookingStatus,
  updateBookingNotiStatus,
} from "./repository.js";

/* calendar */
export async function getAllBookings(req, res) {
  try {
    const { from, to } = req.query;
    const data = await findBookingsRange(from, to);
    res.json({ count: data.length, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* booking ทั้งวัน */
export async function getBookingOnDate(req, res) {
  try {
    const { date } = req.params;
    const data = await findBookingsOnDate(date);
    res.json({ date, count: data.length, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* booking ของฉัน (ยังไม่มี auth) */
export async function getMyBooking(req, res) {
  try {
    const { requester_id } = req.query;
    const data = await findMyBookings(requester_id);
    res.json({ count: data.length, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* create */
export async function createBooking(req, res) {
  try {
    const booking = await insertBooking(req.body);
    res.status(201).json({ data: booking });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* cancel / checkin / admin update */
export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status_id, action_by, reason } = req.body;

    const booking = await updateBookingStatus(
      id,
      status_id,
      action_by ?? null,
      reason ?? null,
    );

    res.json({ data: booking });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function updateNotiStatus(req, res) {
  try {
    const { id } = req.params;
    const status = req.body;

    const result = await updateBookingNotiStatus(id, status);

    res.json({ data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
