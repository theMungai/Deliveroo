import React from "react";
import Logo from "../../assets/Logo.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    { to: "services", label: "Our Services" },
    { to: "how-it-works", label: "How It Works" },
    { to: "rates", label: "Rates" },
    { to: "contact-us", label: "Contact Us" },
  ];

  return (
    <div className="flex justify-between items-center fixed z-20 top-0 w-full bg-white shadow">
      <ScrollLink to="heropage" smooth={true} duration={800} offset={-225}>
        <div className="logo-container cursor-pointer">
          <img src={Logo} alt="Company Logo" />
        </div>
      </ScrollLink>

      <ul className="flex gap-10 font-light p-8">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] hover:text-[#73C322]
                    after:h-[3px] after:rounded-[7px] after:w-0 after:bg-[#73C322]
                    hover:after:w-full focus:after:w-full
                    aria-[current='page']:after:w-full aria-[current='page']:text-[#73C322]
                    after:transition-[width] after:duration-300 after:ease-out"
          >
            <ScrollLink to={item.to} smooth={true} duration={800} offset={-225}>
              {item.label}
            </ScrollLink>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 items-center p-8">
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
    </div>
  );
}

export default Navbar;
