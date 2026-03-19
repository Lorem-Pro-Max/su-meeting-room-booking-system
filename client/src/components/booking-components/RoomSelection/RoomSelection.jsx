import { Modal, Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import RoomPickerCard from "./RoomPickerCard";
import RoomsByFloorTabs from "./RoomByFloorTabs";
import useRoomByFloor from "./useRoomByFloor";
import { getRoomIdsBookedInRange } from "../../../utils/bookingAvailability";

export default function RoomSelection({
  isModalOpen,
  setIsModalOpen,
  setFormData,
  formData,
  rooms,
  bookings = [],
  selectedDate,
}) {
  const [tempSelectedRoom, setTempSelectedRoom] = useState(null);

  const roomsGroupedByFloor = useRoomByFloor(rooms);

  const dateStr = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "";
  const disabledRoomIds = useMemo(() => {
    if (!dateStr || !formData.startTime || !formData.endTime) return new Set();
    return getRoomIdsBookedInRange(
      bookings,
      dateStr,
      formData.startTime,
      formData.endTime
    );
  }, [bookings, dateStr, formData.startTime, formData.endTime]);

  const isTempSelectedRoomDisabled = tempSelectedRoom && disabledRoomIds.has(Number(tempSelectedRoom.id));

  useEffect(() => {
    if (isModalOpen) { setTempSelectedRoom(formData.room ?? null); }
  }, [isModalOpen, formData.room]);

  return (
    <Form.Item label={<span className="font-medium">ห้องที่ต้องการจอง</span>} required>
      <RoomPickerCard
        rooms={rooms}
        formData={formData}
        setFormData={setFormData}
        onOpenModal={() => setIsModalOpen(true)} />

      <Modal
        title={<span className="text-xl font-bold font-kanit">เลือกห้องเรียน/ห้องประชุม</span>}
        open={isModalOpen}
        centered
        width={1143}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <RoomsByFloorTabs
          roomsGroupedByFloor={roomsGroupedByFloor}
          tempSelectedRoom={tempSelectedRoom}
          onSelectTempRoom={setTempSelectedRoom}
          disabledRoomIds={disabledRoomIds}
        />
        <div className="w-full flex flex-col sm:flex-row gap-2 pt-5">
          <button
            className="w-full sm:w-1/2 rounded-lg h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            ยกเลิก
          </button>
          <button
            disabled={!tempSelectedRoom || isTempSelectedRoomDisabled}
            className={`w-full sm:w-1/2 rounded-lg h-10 transition ${tempSelectedRoom && !isTempSelectedRoomDisabled ? "bg-mint-dark hover:bg-mint-darker text-white! cursor-pointer" : "bg-gray-300 cursor-not-allowed text-white"}`}
            onClick={() => {
              if (tempSelectedRoom && !isTempSelectedRoomDisabled) {
                setIsModalOpen(false);
                setFormData((prev) => ({ ...prev, room: tempSelectedRoom }));
              }
            }}
          >
            ยืนยัน
          </button>
        </div>

      </Modal>
    </Form.Item>
  );
}