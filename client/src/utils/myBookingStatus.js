export function shouldHideBooking(status) {
  return status === "canceledByUser";
}

export function isUpcomingBooking(booking) {
  const status = booking?.booking_status;
  if (!status || shouldHideBooking(status)) return false;

  const isUpcomingStatus = ["pending", "approved", "checked-in"];

  const statusMatch = isUpcomingStatus.includes(status);

  const now = new Date();
  now.setHours(now.getHours() + 7);
  const today = now.toISOString().split("T")[0];

  const bookingDate = booking.booking_date.substring(0, 10);

  return bookingDate >= today && statusMatch;
}

export function isHistoryBooking(booking) {
  const status = booking?.booking_status;
  if (!status || shouldHideBooking(status)) return false;

  const finishedStatus = [
    "rejectedByAdmin",
    "canceledByAdmin",
    "completed",
    "pending",
    "approved",
  ];

  const statusMatch = finishedStatus.includes(status);

  const now = new Date();
  now.setHours(now.getHours() + 7);
  const today = now.toISOString().split("T")[0];

  const bookingDate = booking.booking_date.substring(0, 10);

  return bookingDate < today && statusMatch;
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
