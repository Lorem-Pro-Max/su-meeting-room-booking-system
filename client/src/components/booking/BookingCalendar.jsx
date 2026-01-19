import { Calendar } from "antd";

function BookingCalendar() {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div className="m-10 ">
      <Calendar onPanelChange={onPanelChange} className="h-150" />;
    </div>
  );
}

export default BookingCalendar