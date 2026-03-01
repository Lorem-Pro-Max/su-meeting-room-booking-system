import { ClockCircleOutlined } from '@ant-design/icons';
import CalendarIcon from "../../assets/icon/calendar.svg"
import { getStatusBadge } from "../../utils/myBookingStatus";
import dayjs from "dayjs";
import { useState } from 'react';
import CancelBookingModal from './CancleBookingModal';
import { updateBookingStatus } from '../../services/updateBookingStatus';
import { createIotSchedule } from '../../services/createIotSchedule';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'antd';
import { addIotQueue } from '../../services/addIotQueueService';

function MyBookingCardFooter({ booking, mode, setLoading, user, fetchMyBookings }) {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const start = booking?.start_datetime ? dayjs(booking.start_datetime) : null;
    const end = booking?.end_datetime ? dayjs(booking.end_datetime) : null;
    const now = dayjs();
    const checkinStart = start ? start.subtract(30, "minute") : null;
    const checkinEnd = end ?? null;

    const isBeforeWindow = checkinStart ? now.isBefore(checkinStart) : true;
    const isAfterWindow = checkinEnd ? now.isAfter(checkinEnd) : false;
    const isOutsideCheckinWindow = isBeforeWindow || isAfterWindow;

    const dateText = start ? start.format("DD MMM YYYY") : "-";
    const timeText = start && end ? `${start.format("HH:mm")}-${end.format("HH:mm")}` : "-";

    const status = getStatusBadge(booking?.booking_status);

    const bookingStatus = booking?.booking_status;
    const showActions = mode === "upcoming";

    const showOpenButton = showActions && (bookingStatus === "approved" || bookingStatus === "checked-in");
    const openButtonDisabled = bookingStatus === "checked-in" || isOutsideCheckinWindow;
    const openButtonText = bookingStatus === "checked-in" ? "เปิดห้องประชุมแล้ว" : "เปิดห้องประชุม";
    const showCancelButton = showActions && (bookingStatus === "pending" || bookingStatus === "approved" || bookingStatus === "checked-in");
    const showReBookingButton = (bookingStatus === "rejectedByAdmin" || bookingStatus === "canceledByAdmin")
    const cancelButtonDisabled = !["pending", "approved"].includes(bookingStatus);

    const disabledReason = isOutsideCheckinWindow
        ? "สามารถเปิดห้องได้ล่วงหน้า 30 นาที"
        : isAfterWindow
            ? "ไม่สามารถเปิดห้องได้เนื่องจากเลยเวลาการจองแล้ว"
            : "";

    const handleUpdateBookingStatus = async (statusId, reason = null) => {
        try {
            setLoading(true);

            await updateBookingStatus({
                bookingId: booking.id,
                statusId: statusId,
                actionBy: user.id,
                reason: reason,
            });

            await fetchMyBookings();

            setIsModalOpen(false);
        } catch (error) {
            console.error("Update booking failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const createSchedule = async (booking) => {
        try {
            setLoading(true)

            const actionTime = dayjs().toISOString()
            const actionTimeForIotQueue = dayjs().format("YYYY-MM-DD HH:mm:ss");

            const schedules = await createIotSchedule({
                booking_id: booking.id,
                room_id: booking.room_id,
                action_time: actionTime,
                action: "on"
            })

            for (const item of schedules) {
                const res = await addIotQueue({
                    deviceId: item.device_id,
                    action: item.action,
                    actionTime: actionTimeForIotQueue,
                    bookingId: item.booking_id,
                    scheduleId: item.id,
                    actionBy: item.action_by
                });

                if (!res.success) {
                    console.error("Queue failed for schedule:", item.id);
                } else {
                    console.log(
                        `Queued schedule ${item.id} → jobId: ${res.jobId}`
                    );
                }
            }

        } catch (error) {
            console.error("Create schedule failed:", error);
        } finally {
            setLoading(false);
        }
    }

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
                <Tooltip title={isOutsideCheckinWindow ? disabledReason : ""}>
                    <button
                        disabled={openButtonDisabled}
                        className={`w-full sm:w-auto rounded-lg py-2 px-4 font-medium transition 
                            ${!openButtonDisabled
                                ? "bg-mint-dark text-white! hover:bg-primary-main cursor-pointer"
                                : (bookingStatus === "checked-in"
                                    ? "bg-[#52C41A] text-white! cursor-not-allowed"
                                    : "bg-[#52C41A]/40 text-white! cursor-not-allowed"
                                )
                            }`}
                        onClick={async () => {
                            if (openButtonDisabled) return;
                            await createSchedule(booking);
                            await handleUpdateBookingStatus(5)
                        }}
                    >
                        {openButtonText}
                    </button>
                </Tooltip>
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