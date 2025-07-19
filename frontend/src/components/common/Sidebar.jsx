import React from "react";
import { Grid, PlusCircle, User, LogOut } from "react-feather";
import Cube from '../../assets/cube.png'

function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: Grid },
    { label: "New Order", icon: PlusCircle },
    { label: "Profile", icon: User },
  ];

  return (
    <div className="basis-[16%] relative px-4 py-6 min-h-[100vh] bg-[#09090B] text-white">
      <div className="flex items-center mb-6 gap-x-2.5">
        <img src={Cube} alt="" />
        <h1 className="font-bold text-2xl">Deliveroo</h1>
      </div>
      

      <nav>
        <ul>
          {navItems.map(({ label, icon: Icon }) => {
            return (
              <li
                key={label}
                className="cursor-pointer hover:bg-[#18181A] flex items-center space-x-2 p-2 mb-5"
              >
                <Icon />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <button className="text-sm hover:bg-[#18181A] w-[90%] cursor-pointer absolute bottom-5 flex items-center space-x-2 p-2">
        <LogOut className="mx-3" />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
