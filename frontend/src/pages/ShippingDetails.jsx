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
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [destTouched, setDestTouched] = useState(false);
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const changeInputRef = useRef(null);
  const cancelNoBtnRef = useRef(null);
  const { id } = useParams();

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
    fetch(`https://deliveroo-yptw.onrender.com/parcels/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination_address: newDestination }),
    })
      .then((res) => res.json())
      .then((updatedParcel) => {
        setParcel(updatedParcel);
        setChangeModalOpen(false);
        setDestTouched(false);
      })
      .catch(() => alert("Could not update destination."));
  }

  function handleConfirmCancel() {
    const token = localStorage.getItem("token");
    fetch(`https://deliveroo-yptw.onrender.com/parcels/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "Cancelled" }),
    })
      .then((res) => res.json())
      .then((updatedParcel) => {
        setParcel(updatedParcel);
        setCancelModalOpen(false);
      })
      .catch(() => alert("Could not cancel order."));
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const shippingInfo = parcel
    ? [
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
          value: `${parcel.weight}kg`,
        },
        {
          icon: <CurrencyDollarIcon className="h-5 w-5" />,
          label: "Delivery Fee",
          value: `Kshs. ${parcel.price}`,
        },
      ]
    : [];

  return (
    <Layout>
      <div className="relative min-h-screen bg-gray-100">
        <div className="flex flex-col p-4 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Shipment Details</h2>
              <p className="text-gray-600">Tracking ID: {parcel.id}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChangeModalOpen(true)}
                className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2"
              >
                <PencilSquareIcon className="h-5 w-5" /> Change Destination
              </button>
              <button
                onClick={() => setCancelModalOpen(true)}
                className="flex items-center gap-2 rounded bg-red-600 text-white px-4 py-2"
              >
                <XMarkIcon className="h-5 w-5" /> Cancel Order
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-[500px] w-full rounded-md overflow-hidden shadow">
                <ParcelMarker parcel={parcel} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4">Route Details</h3>
              <p>Status: {parcel.status}</p>
              <p>Pickup: {parcel.pickup_address}</p>
              <p>Destination: {parcel.destination_address}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shipping Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shippingInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-4 rounded shadow"
                >
                  {info.icon}
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-semibold">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {isChangeModalOpen && (
            <ModalOverlay onClose={() => setChangeModalOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="z-[10000] w-[90%] max-w-md rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">Change Destination</h3>
                <select
                  ref={changeInputRef}
                  className="w-full p-3 border rounded mb-4"
                  onChange={(e) => {
                    setNewDestination(e.target.value);
                    if (!destTouched) setDestTouched(true);
                  }}
                  value={newDestination}
                >
                  <option value="">Select from saved addresses...</option>
                  {savedAddresses.map((address, idx) => (
                    <option key={idx} value={address}>{address}</option>
                  ))}
                </select>
                {destTouched && !isDestValid && (
                  <p className="text-red-500 text-sm mb-2">{destError}</p>
                )}
                <div className="flex justify-end gap-2">
                  <button onClick={() => setChangeModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                  <button onClick={handleSaveDestination} disabled={!isDestValid} className={`px-4 py-2 rounded text-white ${isDestValid ? 'bg-blue-600' : 'bg-blue-300'}`}>Save</button>
                </div>
              </motion.div>
            </ModalOverlay>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCancelModalOpen && (
            <ModalOverlay onClose={() => setCancelModalOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="z-[10000] w-[90%] max-w-md rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">Cancel Order</h3>
                <p className="mb-4 text-gray-700">Are you sure you want to cancel this order?</p>
                <div className="flex justify-end gap-2">
                  <button ref={cancelNoBtnRef} onClick={() => setCancelModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded">No</button>
                  <button onClick={handleConfirmCancel} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Cancel</button>
                </div>
              </motion.div>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </div>
    </Layout>
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
