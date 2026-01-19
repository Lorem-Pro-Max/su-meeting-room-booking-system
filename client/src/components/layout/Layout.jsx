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
    <div className="min-h-screen flex flex-col font-kanit bg-[#F5F5F5]">
      <Navbar handleMenuClick={handleMenuClick} />
      <div className="flex flex-1">
        <Sidebar isMenuOpen={isMenuOpen} />
        <main className="flex-1 bg-[#F8FAFC]  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout