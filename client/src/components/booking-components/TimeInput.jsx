import { Form, Select, Checkbox, } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getApprovedBookingsForRoomOnDate, isSlotBooked } from "../../utils/bookingAvailability";

dayjs.extend(isSameOrBefore);

function TimeInput({ setFormData, date, bookings = [], selectedRoom }) {
    const selectedDate = date ? dayjs(date) : null;
    const now = dayjs();
    const dateStr = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";
    const approvedForRoom = selectedRoom
        ? getApprovedBookingsForRoomOnDate(bookings, dateStr, selectedRoom.id)
        : [];

    const timeSlots = generateTimeSlots(selectedDate, now, dateStr, approvedForRoom);

    const form = Form.useFormInstance();
    const selectedTimes = Form.useWatch("time", form) || [];

    const getDisplayText = () => {
        if (selectedTimes.length === 0) { return undefined; }
        const firstSlot = timeSlots.find(slot => slot.value === selectedTimes[0]);
        const lastSlot = timeSlots.find(slot => slot.value === selectedTimes[selectedTimes.length - 1]);

        return `${firstSlot?.start} - ${lastSlot?.end}`;
    };

    const handleSelect = (clickedValue) => {
        const allValues = timeSlots.map(slot => slot.value);
        const clickedIdx = allValues.indexOf(clickedValue);
        const currentIndices = selectedTimes.map(value => allValues.indexOf(value));

        let newSelected = [];
        if (selectedTimes.includes(clickedValue)) {
            const minIdx = Math.min(...currentIndices);
            const maxIdx = Math.max(...currentIndices);
            newSelected = (Math.abs(clickedIdx - minIdx) <= Math.abs(clickedIdx - maxIdx))
                ? allValues.slice(clickedIdx + 1, maxIdx + 1)
                : allValues.slice(minIdx, clickedIdx);
        } else {
            const minIdx = currentIndices.length > 0 ? Math.min(...currentIndices, clickedIdx) : clickedIdx;
            const maxIdx = currentIndices.length > 0 ? Math.max(...currentIndices, clickedIdx) : clickedIdx;
            newSelected = allValues.slice(minIdx, maxIdx + 1);
        }

        updateTimeData(newSelected)
    };

    const updateTimeData = (newSelected) => {
        form.setFieldsValue({ time: newSelected });

        if (newSelected.length > 0) {
            const firstSlot = timeSlots.find(s => s.value === newSelected[0]);
            const lastSlot = timeSlots.find(s => s.value === newSelected[newSelected.length - 1]);

            setFormData(prev => ({
                ...prev,
                startTime: firstSlot.start,
                endTime: lastSlot.end
            }));
        } else {
            setFormData(prev => ({ ...prev, startTime: null, endTime: null }));
        }
    };

    return (
        <Form.Item
            label={<span>เวลาที่ต้องการจอง</span>}
            name="time"
            required
        >
            <Select
                mode="multiple"
                placeholder="เลือกเวลาที่ต้องการจอง"
                classNames="time-selector-dropdown"
                suffixIcon={<CalendarOutlined />}
                value={selectedTimes}
                maxTagCount={0}
                maxTagPlaceholder={() => getDisplayText()}
                allowClear
                onClear={() => updateTimeData([])}
                popupRender={() => (
                    <div className="p-2 flex flex-col gap-1 max-h-100 overflow-scroll">
                        {timeSlots.map((time) => {
                            const isSelected = selectedTimes.includes(time.value)
                            return (
                                <div
                                    key={time.value}
                                    onClick={() => !time.disabled && handleSelect(time.value)}
                                    className={`flex items-center p-2 rounded-lg transition-colors ${time.disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-50 cursor-pointer"}`}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        disabled={time.disabled}
                                        className="w-full text-gray-600 pointer-events-none"
                                    >
                                        <span className={isSelected ? "text-teal-700 font-medium" : ""}>
                                            {time.label}
                                        </span>
                                    </Checkbox>
                                </div>)
                        })}
                    </div>
                )}
            />
        </Form.Item>
    );
}


export default TimeInput

const generateTimeSlots = (selectedDate, now, dateStr, approvedBookingsForRoom) => {
    const slots = [];

    let start = dayjs().hour(8).minute(0);
    const endLimit = dayjs().hour(21).minute(0);

    while (start.isBefore(endLimit)) {
        const next = start.add(30, "minute");
        const slotStart = start.format("HH:mm");
        const slotEnd = next.format("HH:mm");

        let isDisabled = false;

        if (selectedDate && selectedDate.isSame(now, "day")) {
            if (next.isSameOrBefore(now)) {
                isDisabled = true;
            }
        }

        if (!isDisabled && dateStr && approvedBookingsForRoom?.length > 0) {
            if (isSlotBooked(approvedBookingsForRoom, dateStr, slotStart, slotEnd)) {
                isDisabled = true;
            }
        }

        slots.push({
            value: slotStart,
            label: `${slotStart} - ${slotEnd} น.`,
            start: slotStart,
            end: slotEnd,
            disabled: isDisabled
        });

        start = next;
    }

    return slots;
};