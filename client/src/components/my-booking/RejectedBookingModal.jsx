import { Modal } from 'antd';
import RejectedBookingImg from "../../assets/image/rejectedBooking.png"
import { ClockCircleOutlined } from '@ant-design/icons';
import CalendarIcon from "../../assets/icon/calendar.svg"
import { EnvironmentOutlined } from "@ant-design/icons";
import { updateBookingNotiStatus } from '../../services/updateBookingNotiStatus';

function RejectedBookingModal({ onClose, booking, fetchMyBookings }) {
    if (!booking) return null;

    const handleUpdateNotiStatus = async () => {
        await updateBookingNotiStatus(booking.id, true);
        await fetchMyBookings()
        onClose();
    };
    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={true}
            onCancel={handleUpdateNotiStatus}
            centered
            footer={null}
            width={448}
        >
            <div className='flex flex-col gap-3 items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={RejectedBookingImg} />
                    <p className='text-lg font-bold'>ขออภัย ไม่สามารถดำเนินการจองได้</p>
                    <p className='text-center'>เนื่องจากการจองนี้ถูกปฎิเสธหรือถูกจองไปก่อนหน้า <br />คุณสามารถเลือกวัน/เวลาใหม่ เพื่อจองอีกครั้งได้ทันที</p>
                    <hr className="my-1 pb-3 border-t border-gray-300 w-full mx-auto" />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <span className="text-[16px]">{booking.meeting_name}</span>
                    <div className="flex gap-2 items-center">
                        <img src={CalendarIcon} />
                        <span>17 Dec 2025</span>
                        <ClockCircleOutlined style={{ fontSize: '14px', color: '#13C2C2' }} />
                        <span className='text-mint-dark'>08:00-09:00 น.</span>
                    </div>
                </div>

                <div className="flex gap-3 bg-[#FFFBE6] my-5 p-4 rounded-2xl w-full">
                    <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white shrink-0">
                        <EnvironmentOutlined />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-sm leading-tight truncate">{booking.title}</div>
                        <div className="text-[12px]">ชั้น 4 อาคารการเรียนการสอนและปฎิบัติการคณะวิทยาศาสตร์</div>
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-2 pt-5">
                    <button
                        className="w-full sm:w-1/2 rounded-lg h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        onClick={handleUpdateNotiStatus}
                    >
                        ยกเลิก
                    </button>
                    <button

                        className="w-full sm:w-1/2 rounded-lg h-10 transition bg-mint-dark hover:bg-teal-600 text-white! cursor-pointer"
                    //onClick={() => handleUpdateBookingStatus(7, "ยกเลิกโดยผู้ใช้งาน")}
                    >
                        จองอีกครั้ง
                    </button>
                </div>
            </div>
        </Modal >)
}

export default RejectedBookingModal