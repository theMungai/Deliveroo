import React from "react";
import { Link } from "react-router-dom";
import { Grid, PlusCircle, User, LogOut } from "react-feather";
import Cube from "../../assets/cube.png";

function Sidebar() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: Grid },
    { to: "/new-order", label: "New Order", icon: PlusCircle },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="basis-[16%] relative px-4 py-6 h-full min-h-screen bg-[#09090B] text-white">
      <div className="mb-6 gap-x-2.5">
        <Link to="/dashboard" className="flex items-center">
          <img src={Cube} alt="Deliveroo logo" />
          <h1 className="font-bold text-2xl">Deliveroo</h1>
        </Link>
      </div>

      <nav>
        <ul>
          {navItems.map(({ to, label, icon: Icon }) => {
            return (
              <li
                key={label}
                className="cursor-pointer hover:bg-[#18181A] p-2 mb-5"
              >
                <Link to={to} className="flex items-center space-x-2">
                  <Icon />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button className="text-sm hover:bg-[#18181A] w-[90%] cursor-pointer absolute bottom-5  p-2">
        <Link to="/" className="flex items-center space-x-2">
          <LogOut className="mx-3" />
          Logout
        </Link>
      </button>
    </div>
  );
}

export default Sidebar;
