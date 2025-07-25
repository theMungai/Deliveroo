import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCube, faTruck, faCheckCircle, faUpload } from '@fortawesome/free-solid-svg-icons';

function ProfileCard() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg');
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [stats, setStats] = useState({ total: 0, inTransit: 0, delivered: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Load profile image from localStorage if available
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://127.0.0.1:8000/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        if (data.id) {
          fetch(`http://127.0.0.1:8000/parcels/user/${data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          })
            .then(res => res.json())
            .then(parcels => {
              setStats({
                total: parcels.length,
                inTransit: parcels.filter(p => p.status === 'In Transit').length,
                delivered: parcels.filter(p => p.status === 'Delivered').length,
              });

              const latestThree = [...parcels]
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 3);
              setRecentOrders(latestThree);
            });
        }
      })
      .catch(() => {
        setUser({ first_name: '', last_name: '', email: '' });
      });
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    }
  };

  const getStatusBadge = (status) => {
    let base = 'px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center';
    switch (status) {
      case 'In Transit':
        return `${base} bg-blue-100 text-blue-700`;
      case 'Delivered':
        return `${base} bg-green-100 text-green-700`;
      case 'Delayed':
        return `${base} bg-orange-100 text-orange-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6 md:col-span-1">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600 text-sm">{user.email}</p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="mt-4 px-4 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Upload Picture
            </button>
          </div>

          {/* Statistics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Statistics</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faCube} className="mr-3 text-gray-500" />
                Total Orders
                <span className="ml-auto font-medium">{stats.total}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faTruck} className="mr-3 text-gray-500" />
                In Transit
                <span className="ml-auto font-medium">{stats.inTransit}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-3 text-gray-500" />
                Delivered
                <span className="ml-auto font-medium">{stats.delivered}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Recent Orders</h3>
            <p className="text-gray-600 mb-4">Here are your last 3 shipments.</p>

            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-400">No recent orders found.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border border-gray-200 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">ID: SWP{order.id}</p>
                      {order.recipient_name && (
                        <p className="text-sm text-gray-600">To: {order.recipient_name}</p>
                      )}
                    </div>
                    <div className={`${getStatusBadge(order.status)}`}>
                      {order.status}
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
