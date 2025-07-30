import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faCity,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
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
    { to: "services", label: "Our Services" },
    { to: "how-it-works", label: "How it Works" },
    { to: "heropage", label: "Home" },
  ];


  const quickLink = quickLinks.map((item) => (
    <li
      key={item}
      className="text-[14px] text-[#FFFFFFB8] hover:text-[#73C322B8] hover:underline cursor-pointer mb-2"
    >
      <ScrollLink to={item.to} smooth={true} duration={800} offset={-225}>
              {item.label}
            </ScrollLink>
    </li>
  ));

  return (
    <>
      <div className="contact-us bg-[#09090B]">
        <div className="flex justify-between text-white  px-[100px] py-[50px] w-full max-xs:flex-col max-xs:px-5 max-xs:gap-y-10 sm:px-[30px] xs:grid xs:grid-cols-2 xs:gap-10 xs:px-[25px] sm:flex md:px-[100px] ">
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

            <button className="bg-[#73C322] max-xs:w-[75%] max-xs:py-3.5 max-xs:relative max-xs:left-1/2 max-xs:transform max-xs:-translate-x-1/2 text-white mt-5 py-2 px-5 rounded-[6px]  absolute right-0 cursor-pointer group">
              <Link to="/user-signup" className="flex items-center gap-x-2.5 max-xs:justify-center">
                Start Now
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className="transition-transform transform group-hover:translate-x-3.5 ease-in-out duration-500 "
                />
              </Link>
            </button>
          </div>
        </div>
        <div className="flex justify-center p-4 text-white max-xs:mt-10 max-xs:text-[16px]">
          <p>© 2025 Deliveroo. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
