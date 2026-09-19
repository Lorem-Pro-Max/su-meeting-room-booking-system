import { BookingCalendar, BookingHeader, BookingForm } from "../components/booking-components"
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { getAllRooms, getBookingOnDate } from "../services";

import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Booking() {
  const [date, setDate] = useState(() => dayjs());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dateString = date.format("YYYY-MM-DD");
        const data = await getBookingOnDate(dateString);
        setBookings(data);
      } catch (err) {
        message.error(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      loadData();
    }
  }, [date]);

  useEffect(() => {
    getAllRooms()
      .then(setRooms)
  }, []);

  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large" tip="Loading" fullscreen />
      <div className="flex flex-col sm:flex-row h-full">
        <div className="flex flex-col gap-5 h-full w-full sm:min-h-0">
          <BookingHeader />
          <BookingCalendar date={date} setDate={setDate} bookings={bookings} loading={loading} />
        </div>
        <BookingForm date={date} setDate={setDate} bookings={bookings} rooms={rooms} loading={loading} setLoading={setLoading} />
      </div>

    </>
  );
}
