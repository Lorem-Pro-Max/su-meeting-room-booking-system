import { Calendar, ConfigProvider, Grid } from "antd";
import { useState, useEffect } from "react";
import { isValidElement, cloneElement } from "react";
import BookingListModal from "./BookingModal/BookingListModal";
import { getBuildingAvailability } from "../../services";


function BookingCalendar({ date, setDate, bookings }) {
  const [selectedValue, setSelectedValue] = useState(date);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityMap, setAvailabilityMap] = useState([]);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isFullscreen = screens.xl;

  const fetchAvailability = async (value) => {
    const startDate = value.startOf("month").format("YYYY-MM-DD");
    const endDate = value.endOf("month").format("YYYY-MM-DD");
    try {
      const result = await getBuildingAvailability(startDate, endDate);
      // ทำ lookup map ไว้ใช้ใน cellRender
      const lookup = {};
      result.forEach((item) => {
        const key = item.date.slice(0, 10);
        lookup[key] = Number(item.available_percent);
      });
      setAvailabilityMap(lookup);
    } catch (err) {
      console.error("Fetch availability failed", err);
    }
  };

  const onSelect = (date, { source }) => {
    setDate(date);
    setIsModalOpen(true);
  };

  const onPanelChange = (newValue) => {
    setDate(newValue);
  };

  useEffect(() => {
    fetchAvailability(date);
  }, [date]);

  return (<>
    <div className="w-full p-5 h-full">

      <Calendar
        value={date}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        fullscreen={isFullscreen}
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
    <BookingListModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bookings={bookings} /></>
  );
}

export default BookingCalendar

function getBgColor(percent) {
  if (percent === 0) { return "bg-red-500"; }
  if (percent > 0 && percent <= 30) { return "bg-orange-400"; }
  return "bg-green-500";
}

function buildAvailabilityLookup(availabilityArray) {
  const lookup = {};
  availabilityArray.forEach((item) => {
    const key = item.date.slice(0, 10); // "YYYY-MM-DD" จาก "2026-01-20T00:00:00.000Z"
    lookup[key] = Number(item.available_percent);
  });
  return lookup;
}