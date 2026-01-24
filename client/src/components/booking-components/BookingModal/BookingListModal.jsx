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
                <BookingCard bookings={bookings} />
            </Modal>
        </>
    );
};
export default BookingListModal