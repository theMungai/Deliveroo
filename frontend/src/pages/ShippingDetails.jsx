
import { useState, useRef, useEffect } from "react";
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
import {motion, AnimatePresence } from "framer-motion";

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

  const destError =
    !newDestination.trim()
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

  /* ---------- Demo data (replace w/ props or fetch) ---------- */
  const routeUpdates = [
    { status: "Update", detail: "Left Mountain View Facility", date: "2024-07-29T10:00:00Z" },
    { status: "Update", detail: "Arrived at San Jose sorting center", date: "2024-07-29T14:30:00Z" },
    { status: "Delivered (Est.)", detail: "1 Infinite Loop, Cupertino, CA" },
  ];

  /* Shipping info summary cards */
  const shippingInfo = [
    { icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />, label: "Tracking #", value: "SWP001" },
    { icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />, label: "Status", value: "In Transit" },
    { icon: <UserIcon className="h-5 w-5" />, label: "Recipient", value: "John Doe" },
    { icon: <MapPinIcon className="h-5 w-5" />, label: "Destination", value: "1 Infinite Loop, Cupertino, CA" },
    { icon: <ScaleIcon className="h-5 w-5" />, label: "Weight", value: "2.5kg" },
    { icon: <CurrencyDollarIcon className="h-5 w-5" />, label: "Delivery Fee", value: "Kshs. 1,000" },
  ];

  return (
    <div className="flex h-screen font-sans bg-gray-100 overflow-hidden">
      {/* ---------- Sidebar (always full height) ---------- */}
      

      {/* ---------- Main Column (scrollable) ---------- */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Title + Top Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Shipment Details</h2>
              <p className="text-gray-600 font-medium">Tracking ID: SWP001</p>
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
              <div className="flex h-64 items-center justify-center rounded-lg border bg-gray-200 md:h-72">
                <p className="text-gray-500">[Map Placeholder]</p>
              </div>
            </div>

            {/* Route Details */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4">Route Details</h3>
              <ul className="space-y-4">
                {routeUpdates.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span
                      className={`mt-1 h-3 w-3 rounded-full ${
                        index === routeUpdates.length - 1
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <div>
                      <p className="font-semibold">{item.status}</p>
                      <p className="text-sm text-gray-700">{item.detail}</p>
                      {item.date && (
                        <p className="text-xs text-gray-500">{item.date}</p>
                      )}
                    </div>
                  </li>
                ))}
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

      {/* ---------- Mobile Sidebar Drawer (optional; appears when opened) ---------- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <ModalOverlay onClose={() => setSidebarOpen(false)}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.15 }}
              className="flex h-full w-64 flex-col justify-between bg-gray-900 text-white"
            >
              <div>
                <div className="p-6 text-2xl font-bold">Deliveroo</div>
                <nav className="mt-4 space-y-2">
                  <SidebarItem icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" />
                  <SidebarItem icon={<PlusCircleIcon className="h-5 w-5" />} text="New Order" />
                  <SidebarItem icon={<UserCircleIcon className="h-5 w-5" />} text="Profile" />
                </nav>
              </div>
              <div className="border-t border-gray-700 p-4">
                <SidebarItem icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />} text="Logout" />
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ---------- Change Destination Modal ---------- */}
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

              {/* Saved addresses dropdown */}
              <select
                className="mb-4 w-full rounded border p-3 ring-blue-300/focus"
                onChange={(e) => {
                  setNewDestination(e.target.value);
                  if (!destTouched) setDestTouched(true);
                }}
                value={newDestination}
              >
                <option value="">Select from saved addresses...</option>
                {savedAddresses.map((address, index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>

              {/* Manual input */}
              <input
                ref={changeInputRef}
                type="text"
                placeholder="Or enter new address"
                value={newDestination}
                onChange={(e) => {
                  setNewDestination(e.target.value);
                  if (!destTouched) setDestTouched(true);
                }}
                className="mb-2 w-full rounded border p-3 ring-blue-300/focus"
              />

              {destTouched && destError && (
                <p className="mb-2 text-sm text-red-500">{destError}</p>
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
                    isDestValid ? "bg-blue-600 bg-blue-700/hover" : "bg-blue-300"
                  }`}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* ---------- Cancel Order Modal ---------- */}
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
                Are you sure? Once you cancel this order, an email will be sent to you to confirm cancellation.
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
                  className="rounded bg-red-600 px-4 py-2 font-medium text-white bg-red-700/hover"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
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
