import hamburgerMenu from "../../assets/icon/hamburger.svg";
import Logo from "../../assets/icon/logo.svg";
import UserIcon from "../../assets/icon/user.svg";

function Navbar({ handleMenuClick }) {
  return (
    <div className="w-full min-h-14 bg-primary-dark text-white flex justify-between px-6">
      <div className="flex items-center gap-5 ">
        <img src={hamburgerMenu} className="w-6 h-6 cursor-pointer" onClick={handleMenuClick} />
        <span>Room Reservation System</span>
      </div>
      <div className="flex items-center gap-5 pr-6">
        <div className="h-8 flex items-center gap-1 rounded-lg bg-[#00474F] px-2 py-1">
          <img src={UserIcon} alt="user" className="w-3 h-3" />
          <span className="hidden sm:inline text-sm">
            Nuthawara K.
          </span>
        </div>
        <img src={Logo} className="hidden sm:block sm:h-10" />
      </div>
    </div>
  );
}

export default Navbar