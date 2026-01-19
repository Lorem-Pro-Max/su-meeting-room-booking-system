import { Modal, Form } from "antd";
import { useEffect, useState } from "react";
import RoomPickerCard from "./RoomPickerCard";
import RoomsByFloorTabs from "./RoomByFloorTabs";
import useRoomByFloor from "./useRoomByFloor";

export default function RoomSelection({
  isModalOpen,
  selectedRoom,
  setIsModalOpen,
  setSelectedRoom,
  rooms = [],
}) {
  const [tempSelectedRoom, setTempSelectedRoom] = useState(null);

  const roomsGroupedByFloor = useRoomByFloor(rooms);

  useEffect(() => {
    if (isModalOpen) setTempSelectedRoom(selectedRoom ?? null);
  }, [isModalOpen, selectedRoom]);

  return (
    <Form.Item label={<span className="font-medium">ห้องที่ต้องการจอง</span>} required>
      <RoomPickerCard selectedRoom={selectedRoom} onOpenModal={() => setIsModalOpen(true)} />

      <Modal
        title={<span className="text-xl font-bold font-kanit">เลือกห้องเรียน/ห้องประชุม</span>}
        open={isModalOpen}
        centered
        width={1143}
        onOk={() => {
          if (tempSelectedRoom) setSelectedRoom(tempSelectedRoom);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        okButtonProps={{
          disabled: !tempSelectedRoom,
          style: {
            width: "45%",
            height: "40px",
            backgroundColor: "#13C2C2",
            fontSize: "18px",
            fontWeight: "600",
          },
        }}
        cancelButtonProps={{
          style: {
            width: "45%",
            height: "40px",
            fontSize: "18px",
            fontWeight: "600",
          },
        }}
      >
        <RoomsByFloorTabs
          roomsGroupedByFloor={roomsGroupedByFloor}
          tempSelectedRoom={tempSelectedRoom}
          onSelectTempRoom={setTempSelectedRoom}
        />
      </Modal>
    </Form.Item>
  );
}
