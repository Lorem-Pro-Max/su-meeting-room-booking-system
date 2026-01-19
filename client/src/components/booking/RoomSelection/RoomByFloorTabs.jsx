
import { Card, Row, Col, Tabs } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useMemo } from "react";

export default function RoomsByFloorTabs({
  roomsGroupedByFloor,
  tempSelectedRoom,
  onSelectTempRoom,
}) {
  const floorTabItems = useMemo(() => {
    const sortedFloors = Array.from(roomsGroupedByFloor.keys()).sort(
      (firstFloorKey, secondFloorKey) => Number(firstFloorKey) - Number(secondFloorKey)
    );

    if (!sortedFloors.length) {
      return [{ key: "empty", label: "ไม่มีข้อมูล", children: <div>ไม่พบห้อง</div> }];
    }

    return sortedFloors.map((floorKey) => {
      const roomsOnThisFloor = roomsGroupedByFloor.get(floorKey) ?? [];

      return {
        key: floorKey,
        label: `ชั้นที่ ${floorKey}`,
        children: (
          <div className="max-h-[450px] overflow-y-auto overflow-x-hidden p-2 bg-gray-50 rounded-xl">
            <Row gutter={[12, 12]}>
              {roomsOnThisFloor.map((roomItem) => {
                const roomId = roomItem.id ?? `${roomItem.floor}-${roomItem.title ?? roomItem.name}`;
                const roomName = roomItem.title ?? roomItem.name ?? "-";
                const buildingName = roomItem.building_name ?? "";

                const isSelected = tempSelectedRoom?.id === roomItem.id;

                return (
                  <Col span={8} key={roomId}>
                    <Card
                      className={`room-item-card ${isSelected ? "selected" : ""}`}
                      onClick={() => onSelectTempRoom(roomItem)}
                      style={{ width: "100%" }}
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white shrink-0">
                          <EnvironmentOutlined />
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-sm leading-tight truncate">
                            {roomName}
                          </div>
                          <div className="text-[10px] text-gray-500">ชั้น {floorKey}</div>
                          {buildingName ? (
                            <div className="text-[9px] text-gray-400 mt-1 line-clamp-2">
                              {buildingName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ),
      };
    });
  }, [roomsGroupedByFloor, tempSelectedRoom, onSelectTempRoom]);

  return <Tabs defaultActiveKey={floorTabItems[0]?.key ?? "1"} items={floorTabItems} indicator={{ size: (origin) => origin - 20 }} />;
}
