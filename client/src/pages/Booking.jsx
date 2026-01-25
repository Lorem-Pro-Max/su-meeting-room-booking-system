import { BookingCalendar, BookingHeader, BookingForm } from "../components/booking-components"
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { getAllRooms, getBookingOnDate } from "../services";

export default function Booking() {
  const [date, setDate] = useState(() => dayjs());
  const [bookings, setBookings] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const dateString = date.format("YYYY-MM-DD");
        const data = await getBookingOnDate(dateString);
        setBookings(data);
      } catch (err) {
        message.error(err.message);
        setBookings([]);
      } finally {
        setIsLoading(false);
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
      <div className="flex flex-col sm:flex-row h-full">
        <div className="flex flex-col gap-5 h-full w-full">
          <BookingHeader />
          <BookingCalendar date={date} setDate={setDate} bookings={bookings} />
        </div>
        <BookingForm date={date} setDate={setDate} bookings={bookings} rooms={rooms} />
      </div>
    </>
  );
}
