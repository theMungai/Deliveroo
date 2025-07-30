import React from "react";
import { Link } from "react-router-dom";
import { Grid, PlusCircle, User, LogOut } from "react-feather";
import Cube from "../../assets/cube.png";

function Sidebar({ closeSidebar }) {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: Grid },
    { to: "/new-order", label: "New Order", icon: PlusCircle },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="w-[80px] md:w-[160px] min-h-screen bg-[#09090B] text-white py-4 flex flex-col items-center sm:items-start px-0 sm:px-4 fixed left-0 top-0 z-60 ">

      {/* Logo */}
      <Link to="/dashboard" onClick={closeSidebar} className="mb-10" title="Home">
        <img src={Cube} alt="Deliveroo logo" className="w-6 h-6" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-6">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={label}>
              <Link to={to} onClick={closeSidebar} className="hover:bg-[#18181A] p-2 w-full rounded flex items-center space-x-2" title={label}>
                <Icon size={22} />
                 <span className="max-md:hidden md:inline text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-5">
        <Link
          to="/"
          onClick={closeSidebar}
          className="hover:bg-[#18181A] p-2 rounded flex items-center space-x-2"
          title="Logout"
        >
          <LogOut size={22} />
          <span className="max-md:hidden md:inline">Logout</span>
          
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
