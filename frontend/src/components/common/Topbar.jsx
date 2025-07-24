import React, { useState} from "react";
import Cube from "../../assets/cube.png";
import { Link } from "react-router-dom";

function Topbar() {
  const [isOpen, setIsOpen] = useState(false);


  function toggleProfileDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full h-20 flex relative  items-center bg-[#F9F9FA] border-b-[0.3px] border-b-[#d4d4d4cb]">
      <div className="flex justify-between w-full items-center px-4">
        <div className="mb-6 gap-x-2.5">
          <Link to="/dashboard" className="flex items-center">
            <img src={Cube} alt="Deliveroo logo" />
            <h1 className="font-bold text-2xl">Deliveroo</h1>
          </Link>
        </div>
        <div
          className="w-13 h-13 rounded-full cursor-pointer bg-gray-200"
          onClick={toggleProfileDropDown}
        ></div>
      </div>

      {isOpen && (
        <div className="absolute right-[2%] top-[100%] mt-2 w-[200px] border-[0.8px] border-[#d4d4d4cb] bg-white rounded shadow-md z-10">
          <ul className="py-2">
            <Link to="/profile">
              <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                Profile
              </li>
            </Link>

            <Link to="/user-signup">
              <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                Logout
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Topbar;
