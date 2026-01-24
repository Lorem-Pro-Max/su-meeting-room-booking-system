import Booking from "../../assets/icon/booking.svg";

function BookingHeader() {
  return (
    <div className="bg-mint-light h-[96px] p-4">
      <div className="flex gap-2">
        <img src={Booking} className="w-[18px] h-[18px]" alt="booking" />
        <p>จองห้องประชุม</p>
      </div>
      <p className="text-[#737373]">กรุณาระบุข้อมูลเพื่อจองห้องประชุม</p>
    </div>
  );
}

export default BookingHeader