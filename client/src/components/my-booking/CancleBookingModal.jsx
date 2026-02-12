import { Modal } from 'antd';
import CancelBookingImage from "../../assets/image/notebookModal.png"

function CancelBookingModal({ isModalOpen, setIsModalOpen, handleUpdateBookingStatus }) {
    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            centered
            footer={null}
        >
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={CancelBookingImage} />
                    <p className='text-lg font-bold'>ยืนยันยกเลิกการจองนี้?</p>
                    <p className='m-20 text-center'>ข้อมูลการจองนี้จะถูกลบออกจากระบบ หากต้องการใช้งานห้องอีกครั้ง กรุณาทำรายการจองใหม่</p>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-2 pt-5">
                    <button
                        className="w-full sm:w-1/2 rounded-lg h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    >
                        ยกเลิก
                    </button>
                    <button

                        className="w-full sm:w-1/2 rounded-lg h-10 transition bg-[#F5222D] hover:bg-[#A8071A] text-white! cursor-pointer"
                        onClick={() => handleUpdateBookingStatus(7, "ยกเลิกโดยผู้ใช้งาน")}
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
        </Modal>)
}

export default CancelBookingModal