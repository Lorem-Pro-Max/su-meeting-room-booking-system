import { Calendar, ConfigProvider, Grid } from "antd";
import { useState, useEffect } from "react";
import BookingListModal from "./BookingModal/BookingListModal";
import { useBuildingAvailability } from "../../hooks/booking";
import dayjs from "dayjs";

function BookingCalendar({ date, setDate, bookings, loading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isFullscreen = screens.xl;

  const {
    availabilityMap,
    fetchAvailability,
  } = useBuildingAvailability();


  const onSelect = (date, { source }) => {
    setDate(date);
    setIsModalOpen(true);
  };

  const onPanelChange = (newValue) => {
    setDate(newValue);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  useEffect(() => {
    if (date) { fetchAvailability(date); }
  }, [date]);

  return (<>
    <div className="w-full p-5 h-full">

      <Calendar
        value={date}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        fullscreen={isFullscreen}
        disabledDate={disabledDate}
      />

      <style>
        {`
        .ant-picker-calendar-full .ant-picker-calendar-date-value {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 50%;
          background: var(--avail-color); /* default เขียว ถ้าไม่มีข้อมูล */
        }
      `}
      </style>

    </div >
    <BookingListModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bookings={bookings} availabilityMap={availabilityMap} loading={loading} /></>
  );
}

export default BookingCalendar