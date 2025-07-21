import React from "react";
import { Truck } from "react-feather";

const OrderForm = () => {
  return (
    <div className="rounded-[10px] bg-white border-[0.5px] border-[#d4d4d4cb] w-[55%] mx-auto my-5 px-10 py-6">
      <h1 className="font-[600] text-[28px] ">Create a New Parcel Order</h1>
      <p className="text-[15px] text-[#7a7a82] mb-8">
        Fill in the details below to create a new delivery.
      </p>

      <form action="">
        
        <div className="mb-8">
          <label htmlFor="recipient" className="">
            {" "}
            Recipient Name
            <input
              className="block w-full bg-[#F9F9FA] border-[0.5px] border-[#d4d4d4cb] px-2.5 py-3 rounded-[8px] outline-0 mt-2"
              type="text"
              id="recipient"
              placeholder="John Doe"
            />
            <p className="text-[14px] text-[#7a7a82]">
              The full name of the person receiving the parcel.
            </p>
          </label>
        </div>

        <div className="flex items-center gap-x-8 justify-between ">
          <div className="mb-8 basis-1/2">
          <label htmlFor="recipient" className="">
            {" "}
            Pickup Address
            <input
              className="block w-full bg-[#F9F9FA] border-[0.5px] border-[#d4d4d4cb] px-2.5 py-3 rounded-[8px] outline-0 mt-2"
              type="text"
              id="recipient"
              placeholder="1600 Amphitheater Parkway, Mountain View, CA"
            />
            <p className="text-[14px] text-[#7a7a82]">
              Where should we pick up the parcel from?
            </p>
          </label>
        </div>

        <div className="mb-8 basis-1/2">
          <label htmlFor="recipient" className="">
            {" "}
            Destination Address
            <input
              className="block w-full bg-[#F9F9FA] border-[0.5px] border-[#d4d4d4cb] px-2.5 py-3 rounded-[8px] outline-0 mt-2"
              type="text"
              id="recipient"
              placeholder="1 Infinite Loop, Cupertino, CA"
            />
            <p className="text-[14px] text-[#7a7a82]">
              Where is the parcel going?
            </p>
          </label>
        </div>
        </div>

        

        <div className="mb-8">
          <label htmlFor="recipient" className="">
            {" "}
            Weight (kg)
            <input
              className="block w-full bg-[#F9F9FA] border-[0.5px] border-[#d4d4d4cb] px-2.5 py-3 rounded-[8px] outline-0 mt-2"
              type="number"
              id="recipient"
              placeholder="1"
            />
            <p className="text-[14px] text-[#7a7a82]">
              The weight of the parcel in kilograms.
            </p>
          </label>
        </div>

        <div className="w-full border-[0.5px] border-[#d4d4d4cb] rounded-[8px] p-[18px] mb-5">
          <h2 className="italic text-[#73C322] text-[18px] font-[700] mb-7">
            Estimated Shipping Fee
          </h2>

          <div className="flex gap-x-4">
            <Truck color="#73C322" />
            <h2 className="italic text-[18px] font-[700]">KShs. 1,000</h2>
          </div>
        </div>

        <button className="bg-[#73C322] text-white p-3 rounded-[8px] cursor-pointer">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
