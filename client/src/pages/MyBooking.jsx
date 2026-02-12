import { useEffect, useState } from "react";
import { MyBookingTab } from "../components/my-booking/MyBookingTab";
import getMyBookings from "../services/getMyBookings";
import { getCurrentUser } from "../utils/getCurrentUser";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


export default function MyBooking() {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        setLoading(true);
        const data = await getMyBookings(1);
        setMyBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err.message);
        setMyBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large" tip="Loading" fullscreen />
      <div className="bg-white w-full h-full ml-4 px-7 py-6">
        <p className="text-2xl">การจองของฉัน</p>
        <MyBookingTab myBookings={myBookings} setLoading={setLoading} />
      </div>
    </>
  );
}
