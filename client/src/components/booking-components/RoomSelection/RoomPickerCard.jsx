import { Card, Typography } from "antd";
import { PlusOutlined, CheckCircleFilled } from "@ant-design/icons";

export default function RoomPickerCard({ rooms, selectedRoom, onOpenModal }) {
  const selectedRoomName = selectedRoom?.title
  const selectedFloor = selectedRoom?.floor

  return (
    <button
      onClick={onOpenModal}
      className="w-full flex justify-start item-center gap-4 cursor-pointer rounded-2xl shadow-md p-4"
    >
      <div
        className={`flex w-18 h-14 justify-center item-center rounded-xl ${selectedRoom ? "bg-mint-dark text-white" : "bg-teal-100 text-teal-500"
          }`}
      >
        {selectedRoom ? (
          <CheckCircleFilled className="text-xl" />
        ) : (
          <PlusOutlined className="text-xl" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-start">{selectedRoomName || "เลือกห้องเรียน/ห้องประชุม"}</span>
        <span className={`text-start ${selectedRoom ? "" : "hidden"}`} > ชั้น {selectedFloor || null}</span>
        <span className="m-0 text-start text-xs text-gray-600 font-normal">{rooms?.[0]?.building_name}</span>
      </div>
    </button >
  );
}
