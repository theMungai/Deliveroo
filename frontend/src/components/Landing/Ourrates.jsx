import React from "react";
import { CheckCircle } from "react-feather";
import { Link } from "react-router-dom";

function Rate({ category, price, weight }) {
  return (
    <div className="bg-white rounded-[10px] shadow hover:border-2 hover:border-[#73C322] p-8 basis-1/3">
      <h2 className="font-[700] text-xl mb-4">{category}</h2>
      <h1 className="font-[900] text-2xl mb-4">
        Ksh.{price}
        <span className="font-[500] text-[16px]">/parcel</span>
      </h1>

      <ul className="mb-8">
        <li className="text-sm flex items-center gap-x-1">
          <CheckCircle size="18px" color="#73C322" />
          1-3 Business Days
        </li>
        <li className="text-sm flex items-center gap-x-1">
          <CheckCircle size="18px" color="#73C322" />
          Upto {weight}kgs
        </li>
        <li className="text-sm flex items-center gap-x-1">
          <CheckCircle size="18px" color="#73C322" />
          Real-time Tracking
        </li>
      </ul>
      <Link to="/user-signup">
        <button className="border border-[#73C322] text-[#989797] font-bold rounded-[8px] py-2.5 w-full hover:text-white hover:bg-[#73C322] cursor-pointer">
          Choose plan
        </button>
      </Link>
    </div>
  );
}

const Ourrates = () => {
  return (
    <div className="rates py-[105px] bg-[#ECECEE]">
      <h1 className="text-[28px] font-[700] mb-3 text-center">Our Rates</h1>
      <p className="font-[500] text-[16px] mb-12 text-center">
        Transparent and competitive pricing for all your needs
      </p>
      <div className="flex w-[80%] mx-auto justify-between gap-x-8">
        <Rate category="Light Weight" price={300} weight={5} />
        <Rate category="Medium Weight" price={500} weight={15} />
        <Rate category="Heavy Weight" price={1000} weight={25} />
      </div>
    </div>
  );
};

export default Ourrates;
