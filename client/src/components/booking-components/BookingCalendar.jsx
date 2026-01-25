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

    const result = await getBuildingAvailability(startDate, endDate);

    setAvailabilityMap(result)
  }

  const onSelect = (date, { source }) => {
    if (source === "date") {
      setDate(selectedDate);
      setSelectedValue(selectedDate);
      setIsModalOpen(true);
    }
  };

  const onPanelChange = (newValue) => {
    setDate(newValue);
  };

  const fullCellRender = (currentDate) => {
    const dateKey = currentDate.format("YYYY-MM-DD");
    const percent = availabilityMap[dateKey];

    // ถ้ายังไม่มีข้อมูล (เช่น เดือนอื่น) ให้เป็นสีเทาอ่อน
    const bgColor =
      percent === undefined ? "#e5e7eb" : getAvailabilityColor(percent);

    return (
      <div className="h-full w-full flex items-center justify-center">
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: bgColor,
            color: "white",
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentDate.date()}
        </div>
      </div>
    );
  };

  const availabilityArray = Array.isArray(availabilityMap)
    ? availabilityMap
    : Object.values(availabilityMap || {});

  const availabilityLookup = buildAvailabilityLookup(availabilityArray);


  useEffect(() => {
    fetchAvailability(date);
  }, [date]);

  console.log("%", availabilityMap)

  return (<>
    <div className="w-full p-5 h-full">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#13c2c2',
          },
        }
        }
      >
        <Calendar
          value={date}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          fullscreen={isFullscreen}
          cellRender={(currentDate, info) => {
            if (info.type !== "date") return info.originNode;
            if (!isValidElement(info.originNode)) return info.originNode;

            const dateKey = currentDate.format("YYYY-MM-DD");
            const percent = availabilityLookup[dateKey];

            const bgColor = percent === undefined ? "#e5e7eb" : getBgColor(percent);

            const existingStyle = info.originNode.props?.style || {};
            const existingClassName = info.originNode.props?.className || "";

            return cloneElement(info.originNode, {
              className: `${existingClassName}`,
              style: { ...existingStyle, "--avail-color": bgColor },
            });
          }}
        />
      </ConfigProvider>
      <style>
        {`
        .ant-picker-calendar-full .ant-picker-calendar-date-value {
          display: inline-block;
          color: white !important;
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