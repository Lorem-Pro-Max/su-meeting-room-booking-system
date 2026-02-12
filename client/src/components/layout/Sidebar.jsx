import Booking from "../../assets/icon/booking.svg";
import History from "../../assets/icon/history.svg";
import Logout from "../../assets/icon/logout.svg";
import { logoutService } from "../../services";
import { message } from "antd";

import { useLocation, NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { useState } from "react";

function Sidebar({ isMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutService();

      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      message.success("ออกจากระบบเรียบร้อย");

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      sessionStorage.clear();
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div
      className={`hidden md:flex h-full py-6 flex-col justify-between items-center bg-white transition-all duration-300
      ${isMenuOpen ? "w-66" : "w-18"}
    `}
    >
      <div className="flex flex-col gap-4 w-full px-3">
        {/* เมนูที่ 1 */}
        <NavLink
          to="/"
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${isMenuOpen ? "px-4 justify-start" : "justify-center"
            }`}
        >
          <img src={Booking} className="w-[18px] h-[18px]" alt="booking" />
          {isMenuOpen && (
            <p className="text-sm font-medium whitespace-nowrap pt-4">
              จองห้องเรียน/ห้องประชุม
            </p>
          )}
        </NavLink>

        {/* เมนูที่ 2 */}
        <NavLink
          to="/my-booking"
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${isMenuOpen ? "px-4 justify-start" : "justify-center"
            }`}
        >
          <img src={History} className="w-[18px] h-[18px]" alt="history" />
          {isMenuOpen && (
            <p className="text-sm font-medium whitespace-nowrap pt-4">
              การจองของฉัน
            </p>
          )}
        </NavLink>
      </div>

      {/* เมนูล่าง (Logout) */}
      <div className="w-full px-3">
        <div
          onClick={() => setIsLogoutModalOpen(true)}
          className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${isMenuOpen ? "px-4 justify-start" : "justify-center"
            }`}
        >
          <img src={Logout} className="w-[18px] h-[18px]" alt="logout" />
          {isMenuOpen && <p className="text-sm font-medium pt-4">Logout</p>}
        </div>
      </div>
      <LogoutModal handleLogout={handleLogout} isLogoutModalOpen={isLogoutModalOpen} setIsLogoutModalOpen={setIsLogoutModalOpen} />
    </div>
  );
}

export default Sidebar