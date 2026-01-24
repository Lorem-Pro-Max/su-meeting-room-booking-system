import { Modal, Form, Button } from "antd";
import { useEffect, useState } from "react";
import RoomPickerCard from "./RoomPickerCard";
import RoomsByFloorTabs from "./RoomByFloorTabs";
import useRoomByFloor from "./useRoomByFloor";

export default function RoomSelection({
  isModalOpen,
  selectedRoom,
  setIsModalOpen,
  setSelectedRoom,
  rooms,
}) {
  const [tempSelectedRoom, setTempSelectedRoom] = useState(null);

  const roomsGroupedByFloor = useRoomByFloor(rooms);

  useEffect(() => {
    if (isModalOpen) { setTempSelectedRoom(selectedRoom ?? null); }
  }, [isModalOpen, selectedRoom]);

  return (
    <Form.Item label={<span className="font-medium">ห้องที่ต้องการจอง</span>} required>
      <RoomPickerCard rooms={rooms} selectedRoom={selectedRoom} onOpenModal={() => setIsModalOpen(true)} />

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
        />
        <div className="w-full flex flex-col sm:flex-row gap-2 pt-5">
          <button
            className="w-full sm:w-1/2 rounded-lg h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsModalOpen(false)}
          >
            ยกเลิก
          </button>

          <button
            disabled={!tempSelectedRoom}
            className={` w-full sm:w-1/2 rounded-lg h-10 text-white transition ${tempSelectedRoom ? "bg-mint-dark hover:bg-mint-darker" : "bg-gray-300 cursor-not-allowed"}`}
            onClick={() => {
              if (tempSelectedRoom) {
                setSelectedRoom(tempSelectedRoom);
                setIsModalOpen(false);
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
