import React, { useState, useEffect } from "react";
import { Edit } from "react-feather";

function AdminDash() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const parcelsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://deliveroo-yptw.onrender.com/parcels", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch parcels");
        return res.json();
      })
      .then((data) => {
        setParcels(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch parcels");
        setLoading(false);
      });
  }, []);

  function checkStatus(status) {
    if (status === "In Transit") return "bg-[#DBEAFE] text-[#344BB3]";
    if (status === "Delivered") return "bg-[#DCFCE7] text-[#166534]";
    if (status === "Delayed") return "bg-[#FFEDD5] text-[#A66737]";
    if (status === "Canceled") return "bg-[#FFC5C5] text-[#FF0000]";
    if (status === "Pending") return "bg-[#FFF8C5] text-[#574D00]";
    return "";
  }

  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch =
      parcel.id.toString().includes(searchTerm) ||
      (parcel.recipient_name &&
        parcel.recipient_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (parcel.destination_address &&
        parcel.destination_address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter ? parcel.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredParcels.length / parcelsPerPage);
  const paginatedParcels = filteredParcels.slice(
    (currentPage - 1) * parcelsPerPage,
    currentPage * parcelsPerPage
  );

  return (
    <div className="mx-4 my-12 px-1 max-w-[100%] relative left-1/2 transform -translate-x-1/2 overflow-x-hidden">
      <h1 className="text-[22px] font-[700]">Admin Panel</h1>
      <p className="mb-6 text-[16px] font-[400]">
        Manage all parcel deliveries
      </p>

      <div className="bg-white shadow-xl rounded-[8px] p-4 w-full max-w-full overflow-hidden">
        <h2 className="font-[600] text-[18px]">All Parcels</h2>
        <p className="text-[16px] font-[400] mb-4">
          Manage all parcel deliveries
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by ID, recipient, destination..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-48"
          >
            <option value="">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
            <option value="Canceled">Canceled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Loader and Error */}
        {loading && (
          <div className="flex justify-center items-center relative h-[60vh] w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#73C322]"></div>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="w-full overflow-x-auto ">
              <div className="max-sm:max-w-[90px] md:min-w-[900px]">
                <table className="w-full text-sm rounded-[8px] table-auto border border-[#E5E5E5]">
                  <thead>
                    <tr className="border-b border-[#E5E5E5]">
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Parcel ID
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Status
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Recipient
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Destination
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Weight (kg)
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Updated At
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Price
                      </th>
                      <th className="py-2 px-4 text-left text-[#969393]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParcels.map((parcel) => (
                      <tr key={parcel.id} className="border-b border-[#E5E5E5]">
                        <td className="py-2 px-4">{parcel.id}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`py-1 px-2.5 rounded-[14px] text-sm ${checkStatus(
                              parcel.status
                            )}`}
                          >
                            {parcel.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">{parcel.recipient_name}</td>
                        <td className="py-2 px-4">
                          {parcel.destination_address}
                        </td>
                        <td className="py-2 px-4">{parcel.weight}</td>
                        <td className="py-2 px-4">
                          {parcel.updated_at
                            ? new Date(parcel.updated_at).toLocaleDateString()
                            : ""}
                        </td>
                        <td className="py-2 px-4">KShs. {parcel.price}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => {
                              setSelectedParcel(parcel);
                              setShowPopup(true);
                            }}
                            className="cursor-pointer rounded bg-[#E4E4E4] text-black text-[14px] py-1 px-4 flex items-center"
                          >
                            <Edit className="mr-2" size={14} /> Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showPopup && selectedParcel && (
        <div className="fixed inset-0 bg-[#0a0a0a9a] flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Update Parcel Status</h2>
            <p className="text-sm text-gray-600 mb-4">
              Parcel ID:{" "}
              <span className="font-medium">{selectedParcel.id}</span>
            </p>
            <label className="block mb-4">
              <span className="text-sm text-gray-700">Status</span>
              <select
                className="block w-full border border-[#d4d4d4cb] px-3 py-3 mt-1 mb-3 rounded-md"
                value={selectedParcel.status}
                onChange={(e) =>
                  setSelectedParcel({
                    ...selectedParcel,
                    status: e.target.value,
                  })
                }
              >
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Delayed</option>
                <option>Canceled</option>
                <option>Pending</option>
              </select>
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
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  try {
                    const res = await fetch(
                      `https://deliveroo-yptw.onrender.com/parcels/${selectedParcel.id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                          Accept: "application/json",
                        },
                        body: JSON.stringify({ status: selectedParcel.status }),
                      }
                    );
                    if (!res.ok) throw new Error("Failed to update status");
                    setParcels((prev) =>
                      prev.map((p) =>
                        p.id === selectedParcel.id
                          ? { ...p, status: selectedParcel.status }
                          : p
                      )
                    );
                    alert(`Status updated to: ${selectedParcel.status}`);
                  } catch (err) {
                    alert("Failed to update status");
                  }
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
