import { useEffect, useState } from "react";
import { MyBookingTab } from "../components/my-booking/MyBookingTab";
import getMyBookings from "../services/getMyBookings";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RejectedBookingModal from "../components/my-booking/RejectedBookingModal";


export default function MyBooking() {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings(1);
      setMyBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err.message);
      setMyBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  useEffect(() => {
    const rejected = myBookings.find(
      (booking) =>
        booking.is_notified === false &&
        (booking.booking_status === "rejectedByAdmin" ||
          booking.booking_status === "canceledByAdmin")
    );

    if (rejected) {
      setSelectedBooking(rejected);
    }
  }, [myBookings]);

  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large" tip="Loading" fullscreen />
      <div className="bg-white w-full h-full ml-4 px-7 py-6">
        <p className="text-2xl">การจองของฉัน</p>
        <MyBookingTab myBookings={myBookings} setLoading={setLoading} />
      </div>
      {selectedBooking && (<RejectedBookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        fetchMyBookings={fetchMyBookings}
      />
      )}

    </>
  );
}
