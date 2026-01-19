import {
  Card,
  Modal,
  List,
  Typography,
  Form,
  Input,
  ConfigProvider,
  DatePicker,
  Row,
  Col,
  Select,
  Checkbox,
  Tabs,
} from "antd";

import { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";

import { getAllRooms } from "../../services/getAllRoom";
import RoomSelection from "./RoomSelection/RoomSelection"

const timeSlots = [
  "08:00-08:30 น.",
  "08:30-09:00 น.",
  "09:00-09:30 น.",
  "09:30-10:00 น.",
  "10:00-10:30 น.",
  "10:30-11:00 น.",
  "11:00-11:30 น.",
  "11:30-12:00 น.",
  "12:00-12:30 น.",
];

function BookingForm() {
  const [date, setDate] = useState(new Date());
  const [rooms,setRooms]= useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  useEffect(() => {
    getAllRooms()
      .then(setRooms)
  }, []);

 

  return (
    <div className="w-120 bg-white p-5">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Kanit, sans-serif", 
          },
        }}
      >
        <Form layout="vertical">
          <TitleInput />
          <RoomSelection
            isModalOpen={isModalOpen}
            selectedRoom={selectedRoom}
            setIsModalOpen={setIsModalOpen}
            setSelectedRoom={setSelectedRoom}
            rooms={rooms}
          />
          <UserInfo />
          <Row gutter={16}>
            <Col span={12}>
              <DateInput date={date} />
            </Col>
            <Col span={12}>
              <PhoneInput />
            </Col>
          </Row>
          <TimeInput />
        </Form>
      </ConfigProvider>
    </div>
  );
}

function TitleInput() {
  return (
    <Form.Item
      varient="underlined"
      name="title"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Input
        placeholder="ระบุชื่อการประชุม/การเรียน"
        className="h-[52px] px-4 custom-booking-input"
        variant="underlined"
        suffix={<EditOutlined style={{ fontSize: "24px", color: "#13C2C2" }} />}
      />
    </Form.Item>
  );
}



function UserInfo() {
  return (
    <Form.Item
      name="user"
      label="ชื่อ-นามสกุลผู้จอง"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Input
        variant="boarderless"
        //defaultValue="ดวงจันทร์ จันทร์กระจ่าง"
        disabled
      />
    </Form.Item>
  );
}

function DateInput({ date }) {
  return (
    <Form.Item label="วันที่" name="date" required>
      <DatePicker className="w-full" value={date} />
    </Form.Item>
  );
}

function PhoneInput() {
  return (
    <Form.Item label="เบอร์โทรศัพท์" name="phone">
      <Input placeholder="เบอร์โทรศัพท์" />
    </Form.Item>
  );
}

function TimeInput() {
  return (
    <Form.Item
      label={<span className="font-semibold text-lg">เวลาที่ต้องการจอง</span>}
      name="time"
      required
    >
      <Select
        mode="multiple"
        placeholder="เลือกเวลาที่ต้องการจอง"
        className="w-full"
        dropdownClassName="time-selector-dropdown"
        maxTagCount="responsive"
        suffixIcon={<CalendarOutlined />}
        dropdownRender={() => (
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

export default BookingForm