
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
          <div className=" overflow-y-auto overflow-x-hidden p-4 bg-[#F5F5F5] rounded-2xl">
            <Row gutter={[12, 12]}>
              {roomsOnThisFloor.map((roomItem) => {
                const roomId = roomItem.id ?? `${roomItem.floor}-${roomItem.title ?? roomItem.name}`;
                const roomName = roomItem.title ?? roomItem.name ?? "-";
                const buildingName = roomItem.building_name ?? "";

                const isSelected = tempSelectedRoom?.id === roomItem.id;

                return (
                  <Col key={roomId}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}>
                    <div
                      className={`p-4 rounded-2xl bg-white shadow-lg hover:ring-2 hover:ring-mint-light hover:cursor-pointer ${isSelected
                        ? "ring-1 ring-mint-dark ring-offset-1"
                        : null
                        }`}
                      onClick={() => onSelectTempRoom(roomItem)}
                    >
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white shrink-0">
                          <EnvironmentOutlined />
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold text-sm leading-tight truncate">
                            {roomName}
                          </div>
                          <div className="text-[14px] text-gray-500">ชั้น {floorKey}</div>
                          {buildingName ? (
                            <div className="text-[12px] text-gray-400 mt-1 line-clamp-2">
                              {buildingName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
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
