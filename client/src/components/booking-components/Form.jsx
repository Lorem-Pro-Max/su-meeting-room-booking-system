import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Divider, ConfigProvider
} from "antd";

import { useState } from "react";
import dayjs from 'dayjs';
import RoomSelection from "./RoomSelection/RoomSelection"
import TitleInput from "./TitleInput";
import TimeInput from "./TimeInput";
import BookingCard from "./BookingModal/BookingCard";


function BookingForm({ date, setDate, bookings, rooms }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isError, setIsError] = useState(false)

  const [form, setForm] = useState({
    title: '',
    room_id: '',
    date: '',
    phone: '',
    startTime: '',
    endTime: ''
  });

  return (
    <div className="flex flex-col justify-between md:min-w-116 bg-white h-full">
      <div className="p-5 bg-white">
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 8, // ปรับค่านี้ให้เล็กลงตามต้องการ (หน่วยเป็น px)
              },
            },
          }}
        >
          <Form layout="vertical" className="flex flex-col gap-2">
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
                <DateInput date={date} setDate={setDate} />
              </Col>
              <Col span={12}>
                <PhoneInput />
              </Col>
            </Row>
            <TimeInput />
          </Form>
        </ConfigProvider>
        <Divider></Divider>
        <p>สถานะการจองห้อง</p>
        <div className="max-h-80 2xl:max-h-120 overflow-y-auto overflow-x-hidden space-y-4 px-2">
          <BookingCard bookings={bookings} /></div>
      </div>
      <div>
        <button
          className="w-full sm:w-1/2 h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsModalOpen(false)}
        >
          ยกเลิก
        </button>
        <button
          className={` w-full sm:w-1/2 h-10 text-white transition ${!isError ? "bg-mint-dark hover:bg-mint-darker" : "bg-gray-300 cursor-not-allowed"}`}
        >
          ยืนยัน
        </button>
      </div>
    </div >
  );
}

function UserInfo() {
  return (
    <Form.Item
      name="user"
      label="ชื่อ-นามสกุลผู้จอง"
      rules={[{ required: true, message: "Please input!" }]}
      initialValue="ดวงจันทร์ จันทร์กระจ่าง"
    >
      <Input
        variant="boarderless" disabled
      />
    </Form.Item>
  );
}

function DateInput({ date, setDate, }) {
  const handleChange = (date, dateString) => {
    setDate(date)
  };
  const dateFormat = 'DD MMM YYYY';

  return (
    <Form.Item label="วันที่" name="date" initialValue={date} required>
      <DatePicker format={dateFormat} onChange={handleChange} className="w-full" value={date ? dayjs(date) : null} />
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


export default BookingForm;