import { ClockCircleOutlined } from '@ant-design/icons';
import CalendarIcon from "../../assets/icon/calendar.svg"
import { getStatusBadge } from "../../utils/myBookingStatus";
import dayjs from "dayjs";

function MyBookingCardFooter({ booking }) {
    const start = booking?.start_datetime ? dayjs(booking.start_datetime) : null;
    const end = booking?.end_datetime ? dayjs(booking.end_datetime) : null;

    const dateText = start ? start.format("DD MMM YYYY") : "-";
    const timeText = start && end ? `${start.format("HH:mm")}-${end.format("HH:mm")}` : "-";

    const status = getStatusBadge(booking?.booking_status);

    const canOpenRoom = ["approved"].includes(
        booking?.booking_status
    );
    return (<div className="flex flex-col sm:flex-row p-4 justify-between rounded-b-lg gap-3">
        <div className="flex sm:flex-row flex-col gap-2 sm:items-center">
            <div className="flex gap-2 items-center">
                <img src={CalendarIcon} />
                <span>{dateText}</span>
                <ClockCircleOutlined style={{ fontSize: '14px', color: '#13C2C2' }} />
                <span className='text-mint-dark'>{timeText}</span>
            </div>
            {status && (
                <div className={`rounded-lg py-1 px-3 text-xs font-semibold ${status.className}`}>
                    {status.label}
                </div>
            )}
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
            <button
                disabled={!canOpenRoom}
                className='rounded-lg bg-mint-dark text-white! py-2 px-4'>เปิดห้องประชุม</button>
            <button className='rounded-lg border border-gray-300 text-gray-800 py-2 px-4'>ยกเลิกการจอง</button>
        </div>
    </div>)
}

export default MyBookingCardFooter