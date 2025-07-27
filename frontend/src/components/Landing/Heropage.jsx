import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Heropage = () => {
  return (
    <div className="heropage bg-white p-6 py-8 mt-[180px] max-xs:mt-[100px] xs:mt-[120px] md:mt-[120px]lg:mt-[180px] ">
      <div className="flex justify-between max-xs:mx-[0px] sm:mx-[0px] sm:gap-0 gap-[30px] max-xs:flex-col-reverse xs:flex-col-reverse sm:flex-row">
        <div className="basis-[65%] space-y-7 space-x-6 sm:basis-[55%]">
          <h1 className="text-5xl sm:text-[36px] max-xs:text-[32px] font-[1000]">
            We will <span className="text-[#73C322]">Deliver</span> your <br />
            <span className="text-[#73C322]">Package!</span>
          </h1>
          <h2 className="text-xl max-xs:text-[16px] sm:text-[18px]">
            Trust your package with us. We will deliver your package <br /> on
            time and safely!
          </h2>

        <Link to='/user-signup'>
        <button className="bg-[#73C322] max-xs:w-full max-xs:justify-center max-xs:py-3.5 text-white py-2 px-8 rounded-[10px] cursor-pointer flex items-center gap-x-2.5 group">
            Get Started
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="transition-transform transform group-hover:translate-x-3.5 ease-in-out duration-500 "
            />
          </button>
        </Link>
          

          <div className="flex space-x-7 space-y-7 max-xs:flex-col max-xs:text-center ">
            <div className="">
              <h1 className="text-2xl max-xs:text-3xl font-bold">10+</h1>
              <p className="font-light">Years Experience</p>
            </div>
            <div>
              <h1 className="text-2xl  max-xs:text-3xl font-bold">18K+</h1>
              <p className="font-light">Happy Clients</p>
            </div>
            <div>
              <h1 className="text-2xl  max-xs:text-3xl font-bold">20k+</h1>
              <p className="font-light">Parcel Delivered</p>
            </div>
          </div>
        </div>
        <div className="basis-[30%] sm:basis-[45%]">
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
