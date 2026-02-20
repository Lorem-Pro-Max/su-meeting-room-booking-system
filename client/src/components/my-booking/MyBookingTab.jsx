import React from 'react';
import { Tabs } from 'antd';
import MyBookingCard from './MyBookingCard';
import { isUpcomingBooking, isHistoryBooking, shouldHideBooking } from "../../utils/myBookingStatus";
import { useMemo } from "react";


export function MyBookingTab({ myBookings, setLoading, user }) {
    console.log(myBookings)
    const visibleBookings = useMemo(() => {
        return myBookings?.filter((b) => !shouldHideBooking(b.booking_status));
    }, [myBookings]);

    const upcoming = useMemo(() => {
        return visibleBookings
            .filter(isUpcomingBooking)
            .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
    }, [visibleBookings]);

    const history = useMemo(() => {
        return visibleBookings
            .filter(isHistoryBooking)
            .sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));
    }, [visibleBookings]);

    const items = [
        { key: "1", label: "ที่กำลังจะมาถึง", children: <MyBookingCard myBookings={upcoming} mode="upcoming" setLoading={setLoading} user={user} /> },
        { key: "2", label: "ประวัติการจอง", children: <MyBookingCard myBookings={history} mode="history" user={user} /> },
    ];

    const onChange = key => { };
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

