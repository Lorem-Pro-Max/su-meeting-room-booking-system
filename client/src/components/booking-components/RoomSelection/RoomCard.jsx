import { EnvironmentOutlined } from "@ant-design/icons";
import BuildingIcon from "../../../assets/icon/building.svg"
import { Col } from "antd";


function RoomCard({ roomItem, floorKey, tempSelectedRoom, onSelectTempRoom, disabled = false }) {
    const roomId = roomItem.id ?? `${roomItem.floor}-${roomItem.title ?? roomItem.name}`;
    const roomName = roomItem.title ?? roomItem.name ?? "-";
    const buildingName = roomItem.building_name ?? "";
    const isSelected = tempSelectedRoom?.id === roomItem.id;

    return (
        <Col key={roomId} xs={24} sm={12} md={12} lg={8}>
            <div
                className={`p-4 rounded-2xl bg-white shadow-lg ${disabled ? "opacity-60 cursor-not-allowed bg-gray-50" : "hover:ring-2 hover:ring-mint-light cursor-pointer"} ${isSelected && !disabled ? "ring-1 ring-mint-dark ring-offset-1" : ""}`}
                onClick={() => !disabled && onSelectTempRoom(roomItem)}
                title={disabled ? "ห้องนี้ถูกจองในช่วงเวลาที่เลือกแล้ว (approved)" : undefined}
            >
                <div className="flex gap-3">
                    <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white shrink-0">
                        <img src={BuildingIcon} className="w-4" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-sm leading-tight truncate">{roomName}</div>
                        <div className="text-[14px] text-gray-500">ชั้น {floorKey}</div>
                        {buildingName ? <div className="text-[12px] text-gray-400 mt-1 line-clamp-2">{buildingName}</div> : null}
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default RoomCard