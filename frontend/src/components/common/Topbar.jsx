import React, { useState, useEffect } from "react";
import Cube from "../../assets/cube.png";
import { Link } from "react-router-dom";

function Topbar({ onToggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
  );

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  function toggleProfileDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full h-20 flex items-center bg-[#F9F9FA] border-b border-[#d4d4d4cb] px-4 relative">
      {/* Left section: logo + toggle */}
      <div className="flex items-center gap-x-4">
        {/* Sidebar toggle on small screens */}
        {onToggleSidebar && (
          <button
            className="sm:hidden text-gray-700"
            onClick={onToggleSidebar}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <Link to="/dashboard" className="flex items-center gap-x-2">
          <img src={Cube} alt="Deliveroo logo" className="w-6 h-6" />
          <h1 className="font-bold text-2xl hidden xs:block">Deliveroo</h1>
        </Link>
      </div>

      
      <div className="ml-auto relative">
        <div
          className="w-13 h-13 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center overflow-hidden"
          onClick={toggleProfileDropDown}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {isOpen && (
          <div className="absolute right-0 top-[120%] mt-2 w-[200px] border border-[#d4d4d4cb] bg-white rounded shadow-md z-50">
            <ul className="py-2">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                  Profile
                </li>
              </Link>
              <Link to="/user-signup" onClick={() => setIsOpen(false)}>
                <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                  Logout
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
