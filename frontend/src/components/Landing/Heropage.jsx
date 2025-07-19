import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Heropage = () => {
  return (
    <div className="heropage bg-white p-6 py-8 mt-[180px]">
      <div className="flex justify-between mx-[140px] gap-x-[30px]">
        <div className="basis-[65%] space-y-7 space-x-6">
          <h1 className="text-5xl font-[1000]">
            We will <span className="text-[#73C322]">Deliver</span> your <br />
            <span className="text-[#73C322]">Package!</span>
          </h1>
          <h2 className="text-xl">
            Trust your package with us. We will deliver your package <br /> on
            time and safely!
          </h2>

        <Link to='/user-signup'>
        <button className="bg-[#73C322] text-white py-2 px-8 rounded-[10px] cursor-pointer flex items-center gap-x-2.5 group">
            Get Started
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="transition-transform transform group-hover:translate-x-3.5 ease-in-out duration-500 "
            />
          </button>
        </Link>
          

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
          <img
            src="/photo.jpg"
            alt="Photo"
            className=" block rounded-[12px] w-full h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Heropage;
