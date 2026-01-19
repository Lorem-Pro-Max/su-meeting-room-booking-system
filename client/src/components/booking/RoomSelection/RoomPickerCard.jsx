import { Card, Typography } from "antd";
import { PlusOutlined, CheckCircleFilled } from "@ant-design/icons";

export default function RoomPickerCard({ selectedRoom, onOpenModal }) {
  const selectedRoomName = selectedRoom?.title ?? selectedRoom?.name;

  return (
    <Card
      onClick={onOpenModal}
      className="cursor-pointer rounded-2xl border-dashed border-2 hover:border-teal-400 transition-all bg-gray-50/30"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl ${
            selectedRoom ? "bg-teal-500 text-white" : "bg-teal-100 text-teal-500"
          }`}
        >
          {selectedRoom ? (
            <CheckCircleFilled className="text-xl" />
          ) : (
            <PlusOutlined className="text-xl" />
          )}
        </div>

        <div className="flex-1">
          <Typography.Text
            className={`block text-lg ${selectedRoom ? "font-semibold text-gray-800" : "text-gray-400"}`}
          >
            {selectedRoomName || "เลือกห้องเรียน/ห้องประชุม"}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}
