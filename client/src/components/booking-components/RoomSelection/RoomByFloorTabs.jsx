
import { Row, Tabs } from "antd";
import { useMemo } from "react";
import RoomCard from "./RoomCard";


export default function RoomsByFloorTabs({
  roomsGroupedByFloor,
  tempSelectedRoom,
  onSelectTempRoom,
  disabledRoomIds = new Set(),
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
          <div className="overflow-y-auto overflow-x-hidden p-4 bg-[#F5F5F5] rounded-2xl">
            <Row gutter={[12, 12]}>
              {roomsOnThisFloor.map((roomItem) => (
                <RoomCard
                  key={roomItem.id ?? `${roomItem.floor}-${roomItem.title ?? roomItem.name}`}
                  roomItem={roomItem}
                  floorKey={floorKey}
                  tempSelectedRoom={tempSelectedRoom}
                  onSelectTempRoom={onSelectTempRoom}
                  disabled={disabledRoomIds.has(Number(roomItem.id))}
                />
              ))}
            </Row>
          </div>
        ),
      };
    });
  }, [roomsGroupedByFloor, tempSelectedRoom, onSelectTempRoom, disabledRoomIds]);

  return (
    <Tabs
      defaultActiveKey={floorTabItems[0]?.key ?? "1"}
      items={floorTabItems}
      indicator={{ size: (origin) => origin - 20 }}
    />)
}