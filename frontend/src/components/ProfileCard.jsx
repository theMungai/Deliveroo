import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast} from '@fortawesome/free-solid-svg-icons';
import { CheckCircle, Package } from 'react-feather'

function ProfileCard() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg'); 
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
        <p className="text-gray-600">user@example.com</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          onClick={handleUploadClick}
          className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
        >
          Upload Picture
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
      <ul>
        <li className="flex items-center mb-2 text-gray-700">
          <Package className="mr-3 text-[#73C322]" />
          Total Orders
          <span className="ml-auto font-medium">4</span>
        </li>
        <li className="flex items-center mb-2 text-gray-700">
          <FontAwesomeIcon icon={faTruckFast} className="mr-3 text-[#73C322]" />
          In Transit
          <span className="ml-auto font-medium">2</span>
        </li>
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-[#73C322]" />
          Delivered
          <span className="ml-auto font-medium">2</span>
        </li>
      </ul>
    </div>
  );
}

export default ProfileCard;