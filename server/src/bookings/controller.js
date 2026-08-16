import {
  findBookingsRange,
  findBookingsOnDate,
  findMyBookings,
  insertBooking,
  findBookingTypes,
  updateBookingStatus,
  updateBookingNotiStatus,
} from "./repository.js";

const MAX_PURPOSE_LENGTH = 500;

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

export async function getMyBooking(req, res) {
  try {
    const userId = req.user.id;

    const data = await findMyBookings(userId);
    res.json({ count: data.length, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getBookingTypes(req, res) {
  try {
    const data = await findBookingTypes();
    res.json({ count: data.length, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* create */
export async function createBooking(req, res) {
  try {
    const userId = req.user.id;
    const { booking_type_id, purpose, start_dateTime, end_dateTime } = req.body;

    const bookingTypeId = Number(booking_type_id);
    if (!Number.isInteger(bookingTypeId) || bookingTypeId <= 0) {
      return res.status(400).json({ error: "booking_type_id must be a valid id" });
    }

    const startAt = new Date(start_dateTime);
    const endAt = new Date(end_dateTime);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      return res
        .status(400)
        .json({ error: "start_dateTime and end_dateTime must be valid dates" });
    }

    if (startAt >= endAt) {
      return res
        .status(400)
        .json({ error: "เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม" });
    }

    const trimmedPurpose = purpose?.trim() || null;
    if (trimmedPurpose && trimmedPurpose.length > MAX_PURPOSE_LENGTH) {
      return res.status(400).json({
        error: `purpose must be at most ${MAX_PURPOSE_LENGTH} characters`,
      });
    }

    const bookingData = {
      ...req.body,
      requester_id: userId,
      booking_type_id: bookingTypeId,
      purpose: trimmedPurpose,
    };

    const booking = await insertBooking(bookingData);

    if (!booking) {
      return res.status(409).json({
        error: "ช่วงเวลาที่เลือกถูกจองแล้ว กรุณาเลือกเวลาอื่นหรือเปลี่ยนห้อง",
      });
    }

    res.status(201).json({ data: booking });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* cancel / checkin / admin update */
export async function updateStatus(req, res) {
  try {
    const action_by = req.user.id;
    const { id } = req.params;
    const { status_id } = req.body;

    const booking = await updateBookingStatus(id, status_id, action_by ?? null);

    res.json({ data: booking });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function updateNotiStatus(req, res) {
  try {
    const { id } = req.params;
    const status = req.body;
    const userId = req.user.id;

    const result = await updateBookingNotiStatus(id, status, userId);

    res.json({ data: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
