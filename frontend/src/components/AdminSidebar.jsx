import React from "react";
import { Grid, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import Logo from "../assets/cube.png";

const AdminSidebar = ({ closeSidebar }) => {
  const navItems = [{ to: "/admin", label: "Dashboard", icon: Grid }];

  return (
    <div className="w-[50px] sm:w-[250px] min-h-screen bg-[#09090B] text-white py-6 flex flex-col items-center sm:items-start px-2 sm:px-4 relative transition-all duration-300">
      {/* Logo */}
      <Link
        to="/admin"
        onClick={closeSidebar}
        className="mb-10 flex items-center gap-x-3"
        title="Admin Home"
      >
        <img src={Logo} alt="Deliveroo logo" className="w-6 h-6" />
        <h1 className="hidden sm:block font-bold text-2xl">Deliveroo</h1>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="space-y-6 w-full">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={label}>
              <Link
                to={to}
                onClick={closeSidebar}
                className="hover:bg-[#18181A] p-2 rounded flex justify-center sm:justify-start items-center gap-x-3"
                title={label}
              >
                <Icon size={22} />
                <span className="hidden sm:inline">{label}</span>
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
          <span className="hidden sm:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
