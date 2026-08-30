import { ClockCircleOutlined } from '@ant-design/icons';
import CalendarIcon from "../../assets/icon/calendar.svg"
import { getStatusBadge, getActionReason, ACTIVE_BOOKING_STATUSES } from "../../utils/myBookingStatus";
import dayjs from "dayjs";
import { useState } from 'react';
import CancelBookingModal from './CancleBookingModal';
import { updateBookingStatus } from '../../services/updateBookingStatus';
import { useNavigate } from "react-router-dom";

function MyBookingCardFooter({ booking, mode, setLoading, user, fetchMyBookings }) {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const start = booking?.start_datetime ? dayjs(booking.start_datetime) : null;
    const end = booking?.end_datetime ? dayjs(booking.end_datetime) : null;

    const dateText = start ? start.format("DD MMM YYYY") : "-";
    const timeText = start && end ? `${start.format("HH:mm")}-${end.format("HH:mm")}` : "-";

    const status = getStatusBadge(booking?.booking_status);
    const actionReason = getActionReason(booking);

    const bookingStatus = booking?.booking_status;
    const showActions = mode === "upcoming";

    /* ห้องเปิดอัตโนมัติตามเวลาจอง ผู้ใช้ไม่ต้องกดเปิดเอง สถานะ "ห้องเปิดแล้ว" อ่านจาก badge ได้เลย */
    const showCancelButton = showActions && ACTIVE_BOOKING_STATUSES.includes(bookingStatus);
    const showReBookingButton = (bookingStatus === "rejectedByAdmin" || bookingStatus === "canceledByAdmin")

    const handleUpdateBookingStatus = async (statusId) => {
        try {
            setLoading(true);

            await updateBookingStatus({
                bookingId: booking.id,
                statusId: statusId,
                actionBy: user.id,
            });

            await fetchMyBookings();

            setIsModalOpen(false);
        } catch (error) {
            console.error("Update booking failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (<div className="flex flex-col sm:flex-row p-4 justify-between rounded-b-lg gap-3">
        <div className="flex sm:flex-row flex-col gap-2 sm:items-center">
            <div className="flex gap-2 items-center">
                <img src={CalendarIcon} />
                <span>{dateText}</span>
                <ClockCircleOutlined style={{ fontSize: '14px', color: '#13C2C2' }} />
                <span className='text-mint-dark'>{timeText}</span>
            </div>
            {status && (
                <div className={`w-fit rounded-lg py-1 px-3 text-xs font-semibold ${status.className}`}>
                    {status.label}
                </div>
            )}
            {actionReason && (
                <span className="text-neutral-500">{`หมายเหตุ: ${actionReason}`}</span>
            )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
            {showCancelButton && (
                <button
                    className="w-full sm:w-auto rounded-lg border py-2 px-4 font-medium transition border-gray-300 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    ยกเลิกการจอง
                </button>
            )}
            {showReBookingButton && (
                <button
                    className={`w-full sm:w-auto rounded-lg border py-2 px-4 font-medium transition border-mint-dark text-gray-800 hover:bg-mint-dark hover:text-white! cursor-pointer`}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    จองใหม่อีกครั้ง
                </button>
            )}
        </div>
        <CancelBookingModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handleUpdateBookingStatus={handleUpdateBookingStatus} />
    </div >)
}

export default MyBookingCardFooter
