import React from "react";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const navItems = [
    { label: "Our Services" },
    { label: "How It Works" },
    { label: "Rates" },
    { label: "Contact Us" },
  ];

  const navItem = navItems.map((item, index) => {
    return (
      <li
        key={index}
        className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] hover:text-[#73C322]
                after:h-[3px] after:rounded-[7px] after:w-0 after:bg-[#73C322]
                hover:after:w-full focus:after:w-full
                aria-[current='page']:after:w-full aria-[current='page']:text-[#73C322]
                after:transition-[width] after:duration-300 after:ease-out"
      >
        {item.label}
      </li>
    );
  });


  return (
    <div className="flex justify-between items-center fixed z-20 top-0 w-full bg-white shadow">
      <div className="logo-container cursor-pointer">
        <img src={Logo} alt="Deliveroo logo" />
      </div>

      <ul className="flex gap-10 font-light p-8">{navItem}</ul>
      <div className="flex gap-4 items-center p-8">
        <button className="font-light border-[#73C322] cursor-pointer  hover:bg-[#73C322] hover:text-white text-black py-1 px-4 rounded">
          Login
        </button>
        <button className="font-light border-[#73C322] cursor-pointer  bg-[#73C322] hover:bg-transparent hover:text-black text-white py-1 px-4 rounded">
          Register
        </button>
        <button className="font-light border border-[#73C322]  cursor-pointer bg-[#73c3223f] hover:border-transparent text-black py-1 px-4 rounded">
          Admin
        </button>
      </div>
    </div>
  );
}

export default Navbar;
