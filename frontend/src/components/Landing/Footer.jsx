import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightLong,faCity,faEnvelope,faPhone} from "@fortawesome/free-solid-svg-icons";
import cube from "../../assets/cube.png";

const Footer = () => {
  const addresses = [
    {
      label: "123 Jogoo Road, Nairobi",
      icon: <FontAwesomeIcon icon={faCity} />,
    },
    { label: "+254 795 482 911", icon: <FontAwesomeIcon icon={faPhone} /> },
    {
      label: "deliveroo@gmail.com",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
  ];

  const address = addresses.map((item) => (
    <li key={item} className="flex items-center gap-x-3 text-white mt-2">
      {item.icon}
      <span className="text-[#FFFFFFC2] text-[14px]">{item.label}</span>
    </li>
  ));

  const quickLinks = [
    { label: "Our Services" },
    { label: "How it Works" },
    { label: "Home" },
  ];

  const quickLink = quickLinks.map((item) => (
    <li
      key={item}
      className="text-[14px] text-[#FFFFFFB8] hover:text-[#73C322B8] hover:underline cursor-pointer mb-2"
    >
      {item.label}
    </li>
  ));

  return (
    <>
      <div className="contact-us bg-[#09090B]">
        <div className="flex justify-between text-white  px-[100px] py-[50px] w-full">
          <div>
            <div className="flex items-center gap-x-3.5">
              <img src={cube} alt="" />
              <h1 className="text-2xl font-bold text-[#73C322]">Deliveroo</h1>
            </div>

            <ul>{address}</ul>
          </div>
          <div className="justify-center">
            <p className="font-[500] text-[20px] mb-2.5 text-[#73C322] ">
              Quick Links
            </p>
            <ul>{quickLink}</ul>
          </div>

          <div className="relative">
            <p className="font-bold">
              Let’s start with us in shipping{" "}
              <span className="text-[#73C322B8]">your goods</span>
            </p>

            <button className="bg-[#73C322] text-white mt-5 py-2 px-5 rounded-[6px]  absolute right-0 cursor-pointer group">
              <Link to="/user-signup" className = 'flex items-center gap-x-2.5'>
                Start Now
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className="transition-transform transform group-hover:translate-x-3.5 ease-in-out duration-500 "
                />
              </Link>
            </button>
          </div>
        </div>
        <div className="flex justify-center p-4 text-white">
          <p>© 2025 Deliveroo. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
