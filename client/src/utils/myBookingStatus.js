export function shouldHideBooking(status) {
  return status === "canceledByUser";
}

export function isUpcomingBooking(booking) {
  const status = booking?.booking_status;
  if (!status || shouldHideBooking(status)) return false;

  const isUpcomingStatus = ["pending", "approved", "checked-in"].includes(
    status,
  );
  if (!isUpcomingStatus) return false;

  const today = new Date().toISOString().split("T")[0];

  return booking.booking_date >= today;
}

export function isHistoryBooking(booking) {
  const status = booking?.booking_status;
  if (!status || shouldHideBooking(status)) return false;

  const finishedStatus = ["rejectedByAdmin", "canceledByAdmin", "completed"];

  if (finishedStatus.includes(status)) return true;

  const today = new Date().toISOString().split("T")[0];

  if (booking.booking_date < today) return true;

  return false;
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
