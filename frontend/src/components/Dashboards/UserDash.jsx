import React, { useEffect, useState } from "react";
import { PlusCircle, Calendar, Package, MapPin } from "react-feather";
import { Link } from "react-router-dom";

// Reusable Order component
function Order({ parcelId, status, date, receiver, location, weight }) {
  let statusColor = "";
  switch (status) {
    case "Delivered":
      statusColor = "bg-[#DCFCE7] text-[#166534]";
      break;
    case "Pending":
      statusColor = "bg-[#FFF8C5] text-[#574D00]";
      break;
    case "Delayed":
      statusColor = "bg-[#FFEDD5] text-[#A66737]";
      break;
    case "In Transit":
      statusColor = "bg-[#DBEAFE] text-[#344BB3]";
      break;
    case "Canceled":
      statusColor = "bg-[#FFC5C5] text-[#FF0000]";
      break;
    default:
      statusColor = "bg-gray-200 text-gray-700";
  }

  return (
    <div className="bg-white rounded-[10px] shadow hover:scale-101 transition-transform duration-300 p-5">
      <div className="flex justify-between ">
        <h1 className="text-black text-[18px] font-[500]">{parcelId}</h1>
        {statusColor && (
          <span
            className={`py-1 px-2.5 rounded-[20px] cursor-pointer ${statusColor}`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="text-[#7A7A82] text-[14px] mb-5">To : {receiver}</p>
      <p className="text-[#7A7A82] text-[14px] flex items-center gap-x-2.5 mb-5">
        <MapPin size="16px" />
        {location}
      </p>

      <div className="flex justify-between items-center mb-8">
        <div className="text-[#7A7A82] text-[14px] flex gap-x-2.5 items-center">
          <Calendar size="16px" />
          {date}
        </div>

        <div className="text-[#7A7A82] text-[14px] flex gap-x-2.5 items-center">
          <Package size="16px" />
          {weight}
        </div>
      </div>

      <button className="w-full py-2.5 bg-[#F9F9FA] text-[#7a7a82] cursor-pointer border-[0.8px] rounded-[6px] border-[#d4d4d4cb] hover:border-[#73C322] hover:text-[#73C322]">
        <Link to={`/shipping-details/${parcelId.replace('ID:', '')}`}>View Details</Link>
      </button>
    </div>
  );
}

// ✅ Main component
function UserDash() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParcels = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      setError("Not logged in");
      setLoading(false);
      return;
    }
    fetch("http://127.0.0.1:8000/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Profile fetch failed", res.status, res.statusText);
          setError(`Profile fetch failed: ${res.status}`);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((user) => {
        if (!user) return;
        if (user.id) {
          fetch(`http://127.0.0.1:8000/parcels/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                setError(`Parcels fetch failed: ${res.status}`);
                setLoading(false);
                return null;
              }
              return res.json();
            })
            .then((data) => {
              if (!data) return;
              setParcels(data);
              setLoading(false);
            })
            .catch((err) => {
              setError("Failed to fetch parcels");
              setLoading(false);
            });
        } else {
          setError("User ID not found");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Failed to fetch user profile");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParcels();
    const interval = setInterval(fetchParcels, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-[800] text-[36px]">Your parcels</h1>
        <button className="bg-[#73C322] text-white p-3 rounded-[8px] cursor-pointer">
          <Link to="/new-order" className="flex items-center gap-x-3">
            <PlusCircle />
            Create New Order
          </Link>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && parcels.length === 0 && (
          <div>No orders found.</div>
        )}
        {!loading &&
          !error &&
          parcels.map((parcel) => (
            <Order
              key={parcel.id}
              parcelId={`ID:${parcel.id}`}
              status={parcel.status}
              date={
                parcel.updated_at
                  ? new Date(parcel.updated_at).toLocaleDateString()
                  : ""
              }
              receiver={parcel.recipient_name}
              weight={parcel.weight ? `${parcel.weight}kg` : ""}
              location={`${parcel.pickup_address} ... ${parcel.destination_address}`}
            />
          ))}
      </div>
    </div>
  );
}

export default UserDash;
