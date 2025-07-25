import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PencilSquareIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  MapPinIcon,
  ScaleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import ParcelMarker from "../components/ParcelMarker";

export default function ShippingDetails() {
  const { id } = useParams();

  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [destTouched, setDestTouched] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const changeInputRef = useRef(null);
  const cancelNoBtnRef = useRef(null);

  const savedAddresses = [
    "123 Main St, Nairobi",
    "1 Infinite Loop, Cupertino",
    "Westlands Mall, Nairobi",
  ];

  const destError = !newDestination.trim()
    ? "Destination is required."
    : newDestination.trim().length < 3
    ? "Destination must be at least 3 characters."
    : "";
  const isDestValid = destError === "";

  useEffect(() => {
    if (isChangeModalOpen && changeInputRef.current) {
      changeInputRef.current.focus();
    }
  }, [isChangeModalOpen]);

  useEffect(() => {
    if (isCancelModalOpen && cancelNoBtnRef.current) {
      cancelNoBtnRef.current.focus();
    }
  }, [isCancelModalOpen]);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    fetch(`https://deliveroo-yptw.onrender.com/parcels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch parcel");
        return res.json();
      })
      .then((data) => {
        setParcel(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch parcel");
        setLoading(false);
      });
  }, [id]);

  function handleSaveDestination() {
    if (!isDestValid) {
      setDestTouched(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    fetch(`https://deliveroo-yptw.onrender.com/parcels/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination_address: newDestination }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update destination");
        return res.json();
      })
      .then((updatedParcel) => {
        setParcel(updatedParcel);
        setChangeModalOpen(false);
        setDestTouched(false);
      })
      .catch(() => {
        alert("Could not update destination.");
      });
  }

  function handleConfirmCancel() {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    fetch(`https://deliveroo-yptw.onrender.com/parcels/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "Cancelled" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to cancel order");
        return res.json();
      })
      .then((updatedParcel) => {
        setParcel(updatedParcel);
        setCancelModalOpen(false);
      })
      .catch(() => {
        alert("Could not cancel order.");
      });
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!parcel) return <div className="p-8">No shipment found.</div>;

  const shippingInfo = [
    {
      icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
      label: "Tracking #",
      value: parcel.id,
    },
    {
      icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
      label: "Status",
      value: parcel.status,
    },
    {
      icon: <UserIcon className="h-5 w-5" />,
      label: "Recipient",
      value: parcel.recipient_name,
    },
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      label: "Destination",
      value: parcel.destination_address,
    },
    {
      icon: <ScaleIcon className="h-5 w-5" />,
      label: "Weight",
      value: parcel.weight ? `${parcel.weight}kg` : "",
    },
    {
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      label: "Delivery Fee",
      value: parcel.price ? `Kshs. ${parcel.price}` : "",
    },
  ];

  return (
    <>
      <Layout>
        <div className="flex h-screen relative font-sans bg-gray-100 overflow-hidden">
          <div className="flex-1 flex flex-col h-full">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Shipment Details</h2>
                  <p className="text-gray-600 font-medium">
                    Tracking ID: {parcel.id}
                  </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => setChangeModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium md:flex-none"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                    Change Destination
                  </button>
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 rounded bg-red-600 px-4 py-2 font-medium text-white md:flex-none"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    Cancel Order
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-[500px] w-full rounded-md overflow-hidden shadow">
                    <ParcelMarker parcel={parcel} />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold text-lg mb-4">Route Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                      <div>
                        <p className="font-semibold">Status: {parcel.status}</p>
                        <p className="text-sm text-gray-700">
                          Pickup: {parcel.pickup_address}
                        </p>
                        <p className="text-sm text-gray-700">
                          Destination: {parcel.destination_address}
                        </p>
                        <p className="text-xs text-gray-500">
                          Updated: {parcel.updated_at}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold">Shipping Info</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {shippingInfo.map((card, i) => (
                    <InfoCard
                      key={i}
                      icon={card.icon}
                      label={card.label}
                      value={card.value}
                    />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>

      {/* Modals OUTSIDE Layout */}
      <AnimatePresence>
        {isChangeModalOpen && (
          <ModalOverlay onClose={() => setChangeModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.15 }}
              className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold">Change Destination</h3>
              <p className="mb-4 text-gray-700">
                Once the address has been changed, an email will be sent.
              </p>
              <select
                className="mb-4 w-full rounded border p-3 ring-blue-300/focus"
                onChange={(e) => {
                  setNewDestination(e.target.value);
                  if (!destTouched) setDestTouched(true);
                }}
                value={newDestination}
                ref={changeInputRef}
              >
                <option value="">Select from saved addresses...</option>
                {savedAddresses.map((address, index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>
              {destTouched && !isDestValid && (
                <p className="text-red-500 text-sm mb-2">{destError}</p>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded bg-gray-200 px-4 py-2 font-medium"
                  onClick={() => setChangeModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={!isDestValid}
                  onClick={handleSaveDestination}
                  className={`rounded px-4 py-2 font-medium text-white ${
                    isDestValid ? "bg-blue-600" : "bg-blue-300"
                  }`}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCancelModalOpen && (
          <ModalOverlay onClose={() => setCancelModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.15 }}
              className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-2 text-xl font-bold">Cancel Order</h3>
              <p className="mb-4 text-gray-700">
                Are you sure? Once you cancel this order, a confirmation email
                will be sent.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  ref={cancelNoBtnRef}
                  className="rounded bg-gray-200 px-4 py-2 font-medium"
                  onClick={() => setCancelModalOpen(false)}
                >
                  No
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="rounded bg-red-600 px-4 py-2 font-medium text-white"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable bits

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
