import {
    Form,
    Select,
    Checkbox,
} from "antd";


import { CalendarOutlined } from "@ant-design/icons";

function TimeInput() {
    return (
        <Form.Item
            label={<span>เวลาที่ต้องการจอง</span>}
            name="time"
            required
        >
            <Select
                mode="multiple"
                placeholder="เลือกเวลาที่ต้องการจอง"
                className="w-full"
                classNames="time-selector-dropdown"
                maxTagCount="responsive"
                suffixIcon={<CalendarOutlined />}
                popupRender={() => (
                    <div className="p-2 flex flex-col gap-1">
                        {timeSlots.map((time) => (
                            <div
                                key={time}
                                className={`flex items-center p-2 rounded-lg hover:bg-teal-50 transition-colors`}
                            >
                                <Checkbox className="w-full font-kanit text-gray-600">
                                    {time}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                )}
            />
        </Form.Item>
    );
}

export default TimeInput

const timeSlots = ["08:00-08:30 น.", "08:30-09:00 น.", "09:00-09:30 น.", "09:30-10:00 น.", "10:00-10:30 น.", "10:30-11:00 น.", "11:00-11:30 น.", "11:30-12:00 น.", "12:00-12:30 น.", "12:30-13:00 น.", "13:00-13:30 น.", "13:30-14:00 น.", "14:00-14:30 น.", "14:30-15:00 น.", "15:00-15:30 น.", "15:30-16:00 น.", "16:00-16:30 น.", "16:30-17:00 น.", "17:00-17:30 น.", "17:30-18:00 น.", "18:00-18:30 น.", "18:30-19:00 น.", "19:00-19:30 น.", "19:30-20:00 น."
];