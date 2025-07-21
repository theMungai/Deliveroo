import React from "react";
import { PlusCircle, Calendar, Package, MapPin } from "react-feather";
import { Link } from "react-router-dom";

function Order({ parcelId, status, date, receiver, location, weight }) {
  let statusColor = "";
  switch (status) {
    case "Delivered":
      statusColor = "bg-[#DCFCE7] text-[#166534]";
      break;
    case "Pending":
      statusColor = "bg-[#FFF8C5] text-[#574D00]";
      break;
    case "Delayed":
      statusColor = "bg-[#FFEDD5] text-[#A66737]";
      break;
    case "In transit":
      statusColor = "bg-[#DBEAFE] text-[#344BB3]";
      break;
    case "Canceled":
      statusColor = "bg-[#FFC5C5] text-[#FF0000]";
      break;
  }
  return (
    <div className="bg-white rounded-[10px] shadow hover:scale-101 transition-transform duration-300 p-5">
      <div className="flex justify-between ">
        <h1 className="text-black text-[18px] font-[500]">{parcelId}</h1>
        {statusColor && (
          <span
            className={`py-1 px-2.5 rounded-[20px] cursor-pointer ${statusColor}`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="text-[#7A7A82] text-[14px] mb-5">To : {receiver}</p>
      <p className="text-[#7A7A82] text-[14px] flex items-center gap-x-2.5 mb-5">
        <MapPin size="16px" />
        {location}
      </p>

      <div className="flex justify-between items-center mb-8">
        <div className="text-[#7A7A82] text-[14px] flex gap-x-2.5 items-center">
          <Calendar size="16px" />
          {date}
        </div>

        <div className="text-[#7A7A82] text-[14px] flex gap-x-2.5 items-center">
          <Package size="16px" />
          {weight}
        </div>
      </div>

      <button className="w-full py-2.5 bg-[#F9F9FA] text-[#7a7a82] cursor-pointer border-[0.8px] rounded-[6px] border-[#d4d4d4cb] hover:border-[#73C322] hover:text-[#73C322]">
        <Link to="/shipping-details">View Details</Link>
      </button>
    </div>
  );
}

function UserDash() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12 ">
        <h1 className="font-[800] text-[36px]">Your parcels</h1>
        <button className="bg-[#73C322] text-white  p-3 rounded-[8px] cursor-pointer">
          <Link to='/new-order' className="flex items-center gap-x-3">
            <PlusCircle className="" />
            Create New Order
          </Link>
        </button>
      </div>

      <div className="container-grid grid grid-cols-3 gap-5">
        <Order
          parcelId="ID:SWP001"
          status="In transit"
          date="7/29/2024"
          receiver="John Doe"
          weight="2.5kg"
          location="1600 Amphitheatre Parkway, ...        1 Infinite Loop, C..."
        />

        <Order
          parcelId="ID:SWP002"
          status="Delivered"
          date="7/28/2024"
          receiver="Jane Smith"
          weight="1kg"
          location="221B Baker Street, Lon ...        10 Downing Street, Lon..."
        />

        <Order
          parcelId="ID:SWP003"
          status="Delayed"
          date="7/27/2024"
          receiver="Emily White"
          weight="0.5kg"
          location="Statue of Liberty, Ne...        Empire State Building, N..."
        />

        <Order
          parcelId="ID:SWP004"
          status="Pending"
          date="7/26/2024"
          receiver="Michael Brown"
          weight="3.2kg"
          location="Sydney Opera House, Syd...        Bondi Beach, Sydne..."
        />
      </div>
    </div>
  );
}

export default UserDash;
