import React from "react";

const Heropage = () => {
  return (
    <div className="bg-white p-6 py-8">
      <div className="flex justify-between mx-[140px] gap-x-[30px]">
        <div className="basis-[65%] space-y-7 space-x-6">
          <h1 className="text-4xl font-[1000]">
            We will <span className="text-[#73C322]">Deliver</span>  your <br />
            <span className="text-[#73C322]">Package!</span>
          </h1>
          <h2 className="text-xl">
            Trust your package with us. We will deliver your package <br /> on time and
            safely!
          </h2>
          <button className="hover:bg-[#73C322] text hover:text-black bg-[#73C322] text-white py-2 p-8 rounded">
            Get Started
          </button>
                <div className="flex space-x-7 space-y-7">

        <div className="">
          <h1 className="text-2xl font-bold">10+</h1>
          <p className="font-light">Years Experience</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">18K+</h1>
          <p className="font-light">Happy Clients</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">20k+</h1>
          <p className="font-light">Parcel Delivered</p>
        </div>
      </div>
        </div>
        <div className="basis-[30%]">
          <img src="/photo.jpg" alt="Photo" className=" block rounded-[12px] w-full h-[300px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Heropage;
