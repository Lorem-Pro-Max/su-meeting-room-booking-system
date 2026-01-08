import hamburgerMenu from "../../assets/icon/hamburger.svg";
import Logo from "../../assets/icon/logo.svg";
import UserIcon from "../../assets/icon/user.svg";

export default function Navbar({ handleMenuClick }) {
  return (
    <nav className="ิw-100vw h-[56px] bg-primary-dark text-white flex justify-between">
      <div className="flex items-center gap-5 pl-6">
        <img
          src={hamburgerMenu}
          className="w-6 h-6 cursor-pointer"
          onClick={handleMenuClick}
        />
        <p className="">Room Reservation System</p>
      </div>
      <div className="flex justify-center items-center gap-5 pr-6">
        <div className="w-full flex gap-1 justify-center items-center rounded-xl bg-[#00474F] px-2 py-1  text-white px-2 py-1">
          <img src={UserIcon} className="w-3 h-3" />
          <p>Nuthawara K.</p>
        </div>
        <img src={Logo} className="h-[46px]" />
      </div>
    </nav>
  );
}
