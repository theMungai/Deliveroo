import React, { useState, useEffect } from "react";
import Cube from "../../assets/cube.png";
import { Link } from "react-router-dom";


function AdminTopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg');

  useEffect(() => {
    // Try to get profile image from localStorage
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  function toggleProfileDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full h-20 flex relative  items-center bg-[#F9F9FA] border-b-[0.3px] border-b-[#d4d4d4cb]">
      <div className="flex justify-between w-full items-center px-4">
        <div className="mb-6 gap-x-2.5">
          <div className="flex items-center cursor-pointer">
            <img src={Cube} alt="Deliveroo logo" />
            <h1 className="font-bold text-2xl">Deliveroo</h1>
          </div>
        </div>
       
      </div>
      {isOpen && (
        <div className="absolute right-[2%] top-[100%] mt-2 w-[200px] border-[0.8px] border-[#d4d4d4cb] bg-white rounded shadow-md z-10">
          <ul className="py-2">
            <Link to="/profile">
              <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                Profile
              </li>
            </Link>

            <Link to="/user-signup">
              <li className="px-4 py-2 hover:bg-[#DCFCE7] cursor-pointer">
                Logout
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminTopBar;
