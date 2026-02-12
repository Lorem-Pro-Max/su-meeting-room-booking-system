import { UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

function MyBookingCardBody({ booking }) {
    const createdDate = booking?.created_at ? dayjs(booking.created_at).format("DD MMM YYYY") : null;
    return (
        <div className="bg-[#FFF1B8] px-4 py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span className="text-[16px]">{booking.meeting_name}</span>
            <div className="flex flex-col sm:flex-row sm:gap-5 sm:items-center">
                <div className='flex gap-2 items-center'>
                    <UserOutlined style={{ fontSize: '14px', color: '#FAAD14' }} />
                    <span className='text-neutral-500'>{booking.firstname} {booking.lastname} </span>
                </div>
                <span className='text-neutral-500'>{`วันที่ทำการจอง: ${createdDate}`}</span>
            </div>
        </div>)
}

export default MyBookingCardBody