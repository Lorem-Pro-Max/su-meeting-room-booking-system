import { Calendar, ConfigProvider, Grid } from "antd";
import { useState } from "react";
import BookingListModal from "./BookingModal/BookingListModal";


function BookingCalendar({ date, setDate, bookings }) {
  const [selectedValue, setSelectedValue] = useState(date);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isFullscreen = screens.xl;

  const onSelect = newValue => {
    setDate(newValue)
    setSelectedValue(newValue);
    setIsModalOpen(true)
  };
  const onPanelChange = newValue => {
    setDate(newValue);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onPanelChange={onPanelChange} f
          fullscreen={isFullscreen}
        />
      </ConfigProvider>

    </div >
    <BookingListModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bookings={bookings} /></>
  );
}

export default BookingCalendar

