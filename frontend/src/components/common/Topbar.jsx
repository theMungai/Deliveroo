import React, { useState, useEffect, useRef } from "react";
import Cube from "../../assets/cube.png";
import { Link, useNavigate } from "react-router-dom";

function Topbar({ onToggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
  );
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleProfileDropDown() {
    setIsOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.clear();
    setIsOpen(false);
    navigate("/");
  }

  return (
    <div className="w-full h-20 flex items-center bg-[#F9F9FA] border-b border-gray-200 px-6 relative z-40">
      {/* Sidebar toggle button */}
      {onToggleSidebar && (
        <button
          className="md:hidden text-gray-700 mr-4"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-x-2">
        <img src={Cube} alt="Deliveroo logo" className="w-6 h-6" />
        <h1 className="font-bold text-2xl hidden xs:block">Deliveroo</h1>
      </Link>

      {/* Profile dropdown */}
      <div className="ml-auto relative" ref={dropdownRef}>
        <button
          onClick={toggleProfileDropDown}
          className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-[120%] mt-2 w-[200px] border border-gray-300 bg-white rounded shadow-md z-50">
            <ul className="py-2">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">Profile</li>
              </Link>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
