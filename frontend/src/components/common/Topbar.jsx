import React from "react";
import Cube from '../../assets/cube.png'


function Topbar (){
  return (
    <div className="w-full h-20 flex relative  items-center bg-[#F9F9FA] border-b-[0.3px] border-b-[#818181]">
      <div className="flex justify-between w-full items-center px-4">
        <div className="flex items-center mb-6 gap-x-2.5">
                <img src={Cube} alt="" />
                <h1 className="font-bold text-2xl">Deliveroo</h1>
              </div>
        <div className="w-13 h-13 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default Topbar;
