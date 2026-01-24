import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    } else {
      setIsMenuOpen(true);
    }
  };
  return (
    <div className="h-screen flex flex-col font-kanit">
      <Navbar handleMenuClick={handleMenuClick} />
      <div className="h-full flex overflow-hidden">
        <Sidebar isMenuOpen={isMenuOpen} />
        <main className="flex-1 bg-[#F5F5F5]  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout