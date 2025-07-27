import React from "react";
import Cube from "../../assets/cube.png";
import { Link } from "react-router-dom";

function AdminTopBar() {
  return (
    <div className="w-full h-20 flex items-center bg-[#F9F9FA] border-b border-[#d4d4d4cb] px-4">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-x-3">
          <img src={Cube} alt="Deliveroo logo" className="w-7 h-7" />
          <h1 className="font-bold text-2xl text-[#09090B]">Deliveroo</h1>
        </Link>
      </div>
    </div>
  );
}

export default AdminTopBar;
