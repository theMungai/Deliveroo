import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import Cube from "../../assets/cube.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "services", label: "Our Services" },
    { to: "how-it-works", label: "How It Works" },
    { to: "rates", label: "Rates" },
    { to: "contact-us", label: "Contact Us" },
  ];

  const navItem = navItems.map((item) => (
    <li
      key={item}
      className="lg:mr-6 xl:mr-3 2xl:mr-6 max-xs:mb-6 xs:mb-6 sm:mb-8 md:mb-8 lg:mb-2 cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] hover:text-[#73C322]
                    after:h-[3px] after:rounded-[7px] after:w-0 after:bg-[#73C322]
                    hover:after:w-full focus:after:w-full
                    aria-[current='page']:after:w-full aria-[current='page']:text-[#73C322]
                    after:transition-[width] after:duration-300 after:ease-out"
    >
      <ScrollLink to={item.to} smooth={true} duration={800} offset={-225}>
        {item.label}
      </ScrollLink>
    </li>
  ));

  return (
    <nav
      className="flex justify-between items-center px-7 fixed z-20 top-0 w-full bg-white shadow 3xl:px-[100px]
             2xl:px-[80px]
             xl:px-5
             lg:px-5
             md:px-3 md:py-1
             sm:px-3 sm:py-3
             xs:px-3 xs:py-3
             max-xs:px-3 max-xs:py-3"
    >
      <ScrollLink to="heropage" smooth={true} duration={800} offset={-225}>
        <div className="logo-container cursor-pointer">
          <img src={Logo} alt="Company Logo" className="max-xs:hidden xs:hidden sm:block"/>
          <img src={Cube} alt="Company Logo" className="max-xs:block xs:block sm:hidden" />
        </div>
      </ScrollLink>

      <div className="max-xs:block xs:block sm:block md:block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-customTealBlue"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Menu (for small screens) */}
      <div
        className={`fixed top-0 left-0 z-50 w-1/4 max-xs:w-2/3 xs:w-1/2 sm:w-1/4 md:w-1/4  lg:w-1/4 h-full overflow-y-auto bg-white shadow-sm transition-transform duration-700 ease-in-out transform ${
          menuOpen ? "-translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        {/* Nav Items */}
        <ul className="flex flex-col items-start p-5 mt-[80px] ">{navItem}</ul>

        {/* Auth buttons for side menu */}
        <div className=" flex flex-col space-y-4 w-[95%] mx-auto my-8 ">
          <Link to="/user-signup">
            <button className="w-full font-semibold py-2 px-4 border border-[#73C322] cursor-pointer  hover:bg-[#73C322] hover:text-white text-black rounded">
              Login
            </button>
          </Link>

          <Link to="/user-signup">
            <button className="w-full font-semibold py-2 px-4 border-[#73C322] cursor-pointer  bg-[#73C322] hover:bg-transparent hover:text-black text-white rounded">
              Register
            </button>
          </Link>

          <Link to="/admin-signup">
            <button className="w-full font-semibold py-2 px-4 border border-[#73C322]  cursor-pointer bg-[#73c3223f] hover:border-transparent text-black rounded">
              Admin
            </button>
          </Link>
        </div>
      </div>

      {/* Menu Items for larger screens */}
      <ul className="flex gap-10 items-center font-light px-4 max-xs:hidden xs:hidden sm:hidden md:hidden lg:flex ">
        {navItem}
      </ul>

      {/* Auth buttons for larger screens */}
      <div className="flex gap-4 items-center p-8 max-xs:hidden xs:hidden sm:hidden md:hidden lg:flex">
        <Link to="/user-signup">
          <button className="font-light border-[#73C322] cursor-pointer  hover:bg-[#73C322] hover:text-white text-black py-1 px-4 rounded">
            Login
          </button>
        </Link>

        <Link to="/user-signup">
          <button className="font-light border-[#73C322] cursor-pointer  bg-[#73C322] hover:bg-transparent hover:text-black text-white py-1 px-4 rounded">
            Register
          </button>
        </Link>

        <Link to="/admin-signup">
          <button className="font-light border border-[#73C322]  cursor-pointer bg-[#73c3223f] hover:border-transparent text-black py-1 px-4 rounded">
            Admin
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
