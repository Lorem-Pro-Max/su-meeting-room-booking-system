import { Modal } from 'antd';
import LogoutImage from "../../assets/image/logoutModal.png"

function LogoutModal({ isLogoutModalOpen, setIsLogoutModalOpen, handleLogout }) {
    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isLogoutModalOpen}
            onCancel={() => setIsLogoutModalOpen(false)}
            centered
            footer={null}
        >
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={LogoutImage} />
                    <p className='text-lg font-bold'>ยืนยันยกเลิกการจองนี้?</p>
                    <p className='m-20 text-center'>ข้อมูลการจองนี้จะถูกลบออกจากระบบ หากต้องการใช้งานห้องอีกครั้ง กรุณาทำรายการจองใหม่</p>
                </div>
                <div className="w-full flex flex-col sm:flex-row gap-2 pt-5">
                    <button
                        className="w-full sm:w-1/2 rounded-lg h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => setIsLogoutModalOpen(false)}
                    >
                        ยกเลิก
                    </button>
                    <button

                        className="w-full sm:w-1/2 rounded-lg h-10 transition bg-mint-dark hover:bg-teal-600 text-white! cursor-pointer"
                        onClick={handleLogout}
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
        </Modal>)
}

export default LogoutModal