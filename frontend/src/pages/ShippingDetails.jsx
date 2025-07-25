import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
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
  /* ---------- Sidebar toggle (mobile future-proof; hidden for now) ---------- */
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  /* ---------- Change Destination Modal State ---------- */
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [destTouched, setDestTouched] = useState(false);

  /* Mock saved addresses for dropdown */
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

  /* ---------- Cancel Order Modal State ---------- */
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  /* ---------- Refs for focus mgmt ---------- */
  const changeInputRef = useRef(null);
  const cancelNoBtnRef = useRef(null);

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

  /* ---------- Handlers ---------- */
  function handleSaveDestination() {
    if (!isDestValid) {
      setDestTouched(true);
      return;
    }
    console.log("New destination submitted:", newDestination.trim());
    // TODO: call API
    setChangeModalOpen(false);
    setDestTouched(false);
  }

  function handleConfirmCancel() {
    console.log("Order canceled");
    // TODO: call API
    setCancelModalOpen(false);
  }

  const { id } = useParams();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build shipping info from parcel
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
          value: parcel.weight ? `${parcel.weight}kg` : "",
        },
        {
          icon: <CurrencyDollarIcon className="h-5 w-5" />,
          label: "Delivery Fee",
          value: parcel.price ? `Kshs. ${parcel.price}` : "",
        },
      ]
    : [];

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/parcels/${id}`, {
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
      .catch((err) => {
        setError("Failed to fetch parcel");
        setLoading(false);
      });
  }, [id]);
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!parcel) return <div className="p-8">No shipment found.</div>;

  return (
    <Layout>
      <div className="flex h-screen relative font-sans bg-gray-100 overflow-hidden">
        <div className="flex-1 flex flex-col h-full">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Shipment Details</h2>
                <p className="text-gray-600 font-medium">Tracking ID: {parcel.id}</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={() => setChangeModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium bg-gray-300/hover md:flex-none"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                  Change Destination
                </button>
                <button
                  onClick={() => setCancelModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 rounded bg-red-600 px-4 py-2 font-medium text-white bg-red-700/hover md:flex-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Map + Route Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="h-[500px] w-full rounded-md overflow-hidden shadow">
                  <ParcelMarker parcel={parcel} />
                </div>
              </div>

              {/* Route Details */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-4">Route Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                    <div>
                      <p className="font-semibold">Status: {parcel.status}</p>
                      <p className="text-sm text-gray-700">Pickup: {parcel.pickup_address}</p>
                      <p className="text-sm text-gray-700">Destination: {parcel.destination_address}</p>
                      <p className="text-xs text-gray-500">Updated: {parcel.updated_at}</p>
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
  );
}

/* ---------- Small Reusable Bits ---------- */

function SidebarItem({ icon, text }) {
  return (
    <div className="flex cursor-pointer select-none items-center gap-3 px-6 py-3 bg-gray-800/hover">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}

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
  /* Close on Esc */
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
      {/* stop click bubbling so inner clicks don't close */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
