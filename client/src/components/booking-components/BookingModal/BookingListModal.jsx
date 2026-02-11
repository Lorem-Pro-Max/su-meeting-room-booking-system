import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import BookingCard from './BookingCard';
import dayjs from 'dayjs'

function BookingListModal({ isModalOpen, setIsModalOpen, bookings }) {
    const handleCancel = () => {
        setIsModalOpen(false);

    };

    return (
        <>
            <Modal
                title="สถานะการจองห้อง"
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
                centered
            >
                <div className='flex gap-2 pb-3'>
                    <div className="rounded-full bg-red-800 w-7 h-7"></div>
                    <span className='text-2xl'>
                        {bookings.length > 0 &&
                            dayjs(bookings[0].booking_date).format("DD MMM YYYY")}
                    </span>
                </div>
                <div className="max-h-110 2xl:max-h-250 overflow-y-auto overflow-x-hidden space-y-4 px-2">
                    <BookingCard bookings={bookings} />
                </div>
            </Modal>
        </>
    );
};
export default BookingListModal