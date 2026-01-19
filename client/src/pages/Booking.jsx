import {BookingCalendar, Form, BookingHeader} from "../components/booking"

export default function Booking() {
  return (
    <>
      <div className="flex ">
        <div className="w-full">
          <BookingHeader />
          <BookingCalendar />
        </div>
        <Form />
      </div>
    </>
  );
}
