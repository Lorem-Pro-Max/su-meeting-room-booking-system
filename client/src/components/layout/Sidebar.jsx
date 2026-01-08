import Booking from "../../assets/icon/booking.svg";
import History from "../../assets/icon/history.svg";
import Logout from "../../assets/icon/logout.svg";

export default function Sidebar({ isMenuOpen }) {
  return (
    <div
      className={`py-6 flex flex-col justify-between items-center bg-white transition-all duration-300 ${
        isMenuOpen ? "w-66" : "w-18"
      }`}
    >
      <div className="flex flex-col gap-4 w-full px-3">
        {/* เมนูที่ 1 */}
        <div
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${
            isMenuOpen ? "px-4 justify-start" : "justify-center"
          }`}
        >
          <img src={Booking} className="w-[18px] h-[18px]" alt="booking" />
          {isMenuOpen && (
            <p className="text-sm font-medium whitespace-nowrap">
              จองห้องเรียน/ห้องประชุม
            </p>
          )}
        </div>

        {/* เมนูที่ 2 */}
        <div
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${
            isMenuOpen ? "px-4 justify-start" : "justify-center"
          }`}
        >
          <img src={History} className="w-[18px] h-[18px]" alt="history" />
          {isMenuOpen && (
            <p className="text-sm font-medium whitespace-nowrap">
              การจองของฉัน
            </p>
          )}
        </div>
      </div>

      {/* เมนูล่าง (Logout) */}
      <div className="w-full px-3">
        <div
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${
            isMenuOpen ? "px-4 justify-start" : "justify-center"
          }`}
        >
          <img src={Logout} className="w-[18px] h-[18px]" alt="logout" />
          {isMenuOpen && <p className="text-sm font-medium">Logout</p>}
        </div>
      </div>
    </div>

    /* {isMenuOpen ? (
        <div className="w-66 p-6 flex flex-col justify-between items-center bg-white ">
          <div className="flex flex-col gap-4">
            <div className="w-full h-10 rounded-lg flex justify-center items-center gap-2 px-4">
              <img src={Booking} className="w-[14px] h-[14px] " />
              <p>จองห้องเรียน/ห้องประชุม</p>
            </div>
            <div className="w-full h-10 rounded-lg flex justify-start items-center gap-2 px-4">
              <img src={History} className="w-[14px] h-[14px] " />
              <p>การจองของฉัน</p>
            </div>
          </div>
          <div className="w-full h-10 rounded-lg flex justify-start items-center gap-2 px-4 ">
            <img src={Logout} className="w-[14px] h-[14px]" />
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <div className="w-18 py-6 flex flex-col justify-between items-center bg-white ">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-10 rounded-lg flex justify-center items-center">
              <img src={Booking} className="w-[14px] h-[14px]" />
            </div>
            <div className="w-12 h-10 rounded-lg flex justify-center items-center">
              <img src={History} className="w-[14px] h-[14px]" />
            </div>
          </div>
          <div className="w-12 h-10  rounded-lg flex justify-center items-center">
            <img src={Logout} className="w-[14px] h-[14px]" />
          </div>
        </div>
      )} */
  );
}
