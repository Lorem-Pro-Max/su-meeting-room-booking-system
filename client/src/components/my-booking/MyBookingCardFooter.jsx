import { ClockCircleOutlined } from '@ant-design/icons';
import CalendarIcon from "../../assets/icon/calendar.svg"
import { getStatusBadge } from "../../utils/myBookingStatus";
import dayjs from "dayjs";
import { useState } from 'react';
import CancelBookingModal from './CancleBookingModal';
import { updateBookingStatus } from '../../services/updateBookingStatus';

function MyBookingCardFooter({ booking, mode, setLoading }) {
    console.log(booking)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const start = booking?.start_datetime ? dayjs(booking.start_datetime) : null;
    const end = booking?.end_datetime ? dayjs(booking.end_datetime) : null;

    const dateText = start ? start.format("DD MMM YYYY") : "-";
    const timeText = start && end ? `${start.format("HH:mm")}-${end.format("HH:mm")}` : "-";

    const status = getStatusBadge(booking?.booking_status);

    const bookingStatus = booking?.booking_status;
    const showActions = mode === "upcoming"; // คงไว้เหมือนเดิม
    const showOpenButton = showActions && (bookingStatus === "approved" || bookingStatus === "checked-in");
    const openButtonDisabled = bookingStatus === "checked-in";
    const openButtonText = bookingStatus === "checked-in" ? "เปิดห้องประชุมแล้ว" : "เปิดห้องประชุม";
    const showCancelButton = showActions && (bookingStatus === "pending" || bookingStatus === "approved" || bookingStatus === "checked-in");
    const cancelButtonDisabled = bookingStatus !== "pending";

    const handleUpdateBookingStatus = async (statusId, reason = null) => {
        try {
            setLoading(true);

            await updateBookingStatus({
                bookingId: booking.id,
                statusId: statusId,
                actionBy: Number(booking.requester_id),
                reason: reason,
            });

            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    console.log(booking)
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
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {showOpenButton && (
                <button
                    disabled={openButtonDisabled}
                    className={`w-full sm:w-auto rounded-lg py-2 px-4 font-medium transition ${openButtonDisabled ? "bg-[#52C41A] text-white!  cursor-not-allowed" : "bg-mint-dark text-white! hover:bg-primary-main cursor-pointer"}`}
                    onClick={() => {
                        if (openButtonDisabled) return;
                        handleUpdateBookingStatus(5)
                    }}
                >
                    {openButtonText}
                </button>
            )}

            {showCancelButton && (
                <button
                    disabled={cancelButtonDisabled}
                    className={`w-full sm:w-auto rounded-lg border py-2 px-4 font-medium transition ${cancelButtonDisabled ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed" : "border-gray-300 text-gray-800 hover:bg-gray-100 cursor-pointer"}`}
                    onClick={() => {
                        if (cancelButtonDisabled) { return; }
                        setIsModalOpen(true);
                    }}
                >
                    ยกเลิกการจอง
                </button>
            )}
        </div>
        <CancelBookingModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handleUpdateBookingStatus={handleUpdateBookingStatus} />
    </div >)
}

export default MyBookingCardFooter