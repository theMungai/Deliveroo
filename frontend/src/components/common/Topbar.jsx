import React from "react";

const Topbar = () => {
  return (
    <div className="w-full h-20 flex  items-center bg-[#F9F9FA] border-b-[0.3px] border-b-[#818181]">
      <div className="flex justify-between w-full items-center px-4">
        <h1 className="font-bold text-2xl text-black mb-6">Deliveroo</h1>
        <div className="w-13 h-13 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default Topbar;
