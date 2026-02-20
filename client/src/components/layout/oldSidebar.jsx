import Booking from "../../assets/icon/booking.svg";
import History from "../../assets/icon/history.svg";
import Logout from "../../assets/icon/logout.svg";

import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Sidebar({ isMenuOpen }) {
    const location = useLocation();

    return (
        <div
            className={`py-6 flex flex-col justify-between items-center bg-white transition-all duration-300 ${isMenuOpen ? "w-66" : "w-18"
                }`}
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
                        <p className="text-sm font-medium whitespace-nowrap">
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
                        <p className="text-sm font-medium whitespace-nowrap">
                            การจองของฉัน
                        </p>
                    )}
                </NavLink>
            </div>

            {/* เมนูล่าง (Logout) */}
            <div className="w-full px-3">
                <NavLink
                    to="/login"
                    className={`group flex items-center gap-3 h-10 rounded-lg cursor-pointer text-primary-dark hover:bg-mint-light hover:text-primary-main transition-colors ${isMenuOpen ? "px-4 justify-start" : "justify-center"
                        }`}
                >
                    <img src={Logout} className="w-[18px] h-[18px]" alt="logout" />
                    {isMenuOpen && <p className="text-sm font-medium">Logou5555t</p>}
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar