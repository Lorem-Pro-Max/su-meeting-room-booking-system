import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import BookingCard from './BookingCard';

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
                <div className="max-h-110 2xl:max-h-250 overflow-y-auto overflow-x-hidden space-y-4 px-2">
                    <BookingCard bookings={bookings} />
                </div>
            </Modal>
        </>
    );
};
export default BookingListModal