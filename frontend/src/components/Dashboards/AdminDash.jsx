import React, { useState } from 'react';
import { Edit } from 'react-feather';
import { parcels } from './Parcels';

function AdminDash() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  function checkStatus(status) {
    if (status === "In Transit") return "bg-[#DBEAFE] text-[#344BB3]";
    if (status === "Delivered") return "bg-[#DCFCE7] text-[#166534]";
    if (status === "Delayed") return "bg-[#FFEDD5] text-[#A66737]";
    if (status === "Canceled") return "bg-[#FFC5C5] text-[#FF0000]";
    if (status === "Pending") return "bg-[#FFF8C5] text-[#574D00]";
    return "";
  }

  return (
    <div className='w-[90%] mx-auto my-12'>
      <h1 className='text-[22px] font-[700]'>Admin Panel</h1>
      <p className='mb-6 text-[16px] font-[400]'>Manage all parcel deliveries</p>

      <div className='bg-white shadow-xl rounded-[8px] p-4'>
        <h2 className='font-[600] text-[18px]'>All Parcels</h2>
        <p className='text-[16px] font-[400] mb-4'>Manage all parcel deliveries</p>

        <table className="min-w-full rounded-[8px] table-auto border-[0.5px] border-[#E5E5E5]">
          <thead>
            <tr className="border-b-[0.5px] border-[#E5E5E5]">
              <th className="py-2 px-4 text-left text-[#969393]">Parcel ID</th>
              <th className="py-2 px-4 text-left text-[#969393]">Status</th>
              <th className="py-2 px-4 text-left text-[#969393]">Recipient</th>
              <th className="py-2 px-4 text-left text-[#969393]">Destination</th>
              <th className="py-2 px-4 text-left text-[#969393]">Weight (kg)</th>
              <th className="py-2 px-4 text-left text-[#969393]">Delivery Date</th>
              <th className="py-2 px-4 text-left text-[#969393]">Price</th>
              <th className="py-2 px-4 text-left text-[#969393]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel.id} className="border-b-[0.5px] border-[#E5E5E5]">
                <td className="py-2 px-4">{parcel.id}</td>
                <td>
                  <span className={`py-1 px-2.5 rounded-[14px] cursor-pointer ${checkStatus(parcel.status)}`}>
                    {parcel.status}
                  </span>
                </td>
                <td className="py-2 px-4">{parcel.recipient}</td>
                <td className="py-2 px-4">{parcel.destination}</td>
                <td className="py-2 px-4">{parcel.weight}</td>
                <td className="py-2 px-4">{parcel.deliveryDate}</td>
                <td className="py-2 px-4">KShs. {parcel.price}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setShowPopup(true);
                    }}
                    className="cursor-pointer rounded-[10px] bg-[#E4E4E4] text-black text-[14px] py-1 px-4 flex items-center"
                  >
                    <Edit className="mr-2 text-xs" size="14px" /> Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedParcel && (
        <div className="fixed inset-0 bg-[#0a0a0a9a] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Update Parcel Status</h2>
            <p className="text-sm text-gray-600 mb-4">
              Parcel ID: <span className="font-medium">{selectedParcel.id}</span>
            </p>

            <label className="block mb-4">
              <span className="text-sm text-gray-700">Status</span>
              <select
                className="block w-full border-[0.8px] border-[#d4d4d4cb] px-3 py-3 mt-1 mb-3 outline-0 rounded-md"
                value={selectedParcel.status}
                onChange={(e) =>
                  setSelectedParcel({ ...selectedParcel, status: e.target.value })
                }
              >
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Delayed</option>
                <option>Canceled</option>
                <option>Pending</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-sm text-gray-700">Delivery date</span>
              <input type="date" className="block w-full border-[0.8px] border-[#d4d4d4cb] p-3 mt-1 mb-3 rounded-md" />
            </label>
            

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#73C322] text-white px-4 py-2 rounded"
                onClick={() => {
                  alert(`Status updated to: ${selectedParcel.status}`);
                  setShowPopup(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDash;
