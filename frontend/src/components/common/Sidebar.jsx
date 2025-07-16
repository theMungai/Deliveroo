import React from "react";
import { Grid, PlusCircle, User, LogOut } from "react-feather";

function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: Grid },
    { label: "New Order", icon: PlusCircle },
    { label: "Profile", icon: User },
  ];

  return (
    <div className="basis-[16%] relative px-4 py-6 min-h-[100vh] bg-[#09090B] text-white">
      <h1 className="font-bold text-2xl mt-6 p-6">Deliveroo</h1>

      <nav>
        <ul>
          {navItems.map(({ label, icon: Icon }) => {
            return (
              <li key={label} className="cursor-pointer hover:bg-[#18181A] flex items-center space-x-2 p-2 mb-5">
                <Icon />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <button className='text-sm hover:bg-[#18181A] w-[90%] cursor-pointer absolute bottom-5 flex items-center space-x-2 p-2'>
        
          <LogOut className='mx-3' />
          Logout
        
      </button>
    </div>
  );
}

export default Sidebar;
