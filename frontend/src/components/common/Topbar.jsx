import React from "react";
import Cube from "../../assets/cube.png";
import { Link } from "react-router-dom";
// border-[#d4d4d4cb]
function Topbar() {
  return (
    <div className="w-full h-20 flex relative  items-center bg-[#F9F9FA] border-b-[0.3px] border-b-[#d4d4d4cb]">
      <div className="flex justify-between w-full items-center px-4">
        <div className="mb-6 gap-x-2.5">
          <Link to="/dashboard" className="flex items-center">
            <img src={Cube} alt="Deliveroo logo" />
            <h1 className="font-bold text-2xl">Deliveroo</h1>
          </Link>
        </div>
        <div className="w-13 h-13 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}

export default Topbar;
