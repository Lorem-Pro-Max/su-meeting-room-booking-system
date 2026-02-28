export function shouldHideBooking(status) {
  return status === "canceledByUser";
}

export function isUpcomingBooking(booking) {
  const status = booking?.booking_status;
  if (!status || shouldHideBooking(status)) return false;

  const activeStatus = ["pending", "approved", "checked-in"];

  const now = new Date();
  const isNotFinished = new Date(booking.end_datetime) > now;

  return isNotFinished && activeStatus.includes(status);
}

export function isHistoryBooking(booking) {
  if (shouldHideBooking(booking?.booking_status)) return false;

  const now = new Date();
  if (new Date(booking.end_datetime) <= now) {
    return true;
  }

  const finishedStatus = ["rejectedByAdmin", "canceledByAdmin", "completed"];

  return finishedStatus.includes(booking?.booking_status);
}

export function getStatusBadge(status) {
  if (status === "pending")
    return { label: "รออนุมัติ", className: "bg-[#FA8C16] text-white" };

  if (status === "approved" || status === "checked-in")
    return { label: "จองสำเร็จ", className: "bg-[#52C41A] text-white" };

  if (status === "completed")
    return { label: "สำเร็จแล้ว", className: "bg-[#0958D9] text-white" };

  if (status === "rejectedByAdmin")
    return { label: "ปฏิเสธ", className: "bg-[#FF4D4F] text-white" };

  if (status === "canceledByAdmin")
    return { label: "ยกเลิก", className: "bg-[#C0C0C0] text-white" };

  return null;
}
