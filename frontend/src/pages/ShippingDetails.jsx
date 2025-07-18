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
import { motion, AnimatePresence } from "framer-motion";

export default function ShippingDetails() {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  
  const [isChangeModalOpen, setChangeModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [destTouched, setDestTouched] = useState(false);

  
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

  
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  
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

  
  function handleSaveDestination() {
    if (!isDestValid) {
      setDestTouched(true);
      return;
    }
    console.log("New destination submitted:", newDestination.trim());
    
    setChangeModalOpen(false);
    setDestTouched(false);
  }

  function handleConfirmCancel() {
    console.log("Order canceled");
    
    setCancelModalOpen(false);
  }

  
  const routeUpdates = [
    { status: "Update", detail: "Left Mountain View Facility", date: "2024-07-29T10:00:00Z" },
    { status: "Update", detail: "Arrived at San Jose sorting center", date: "2024-07-29T14:30:00Z" },
    { status: "Delivered (Est.)", detail: "1 Infinite Loop, Cupertino, CA" },
  ];

  
  const shippingInfo = [
    { icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />, label: "Tracking #", value: "SWP001" },
    { icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />, label: "Status", value: "In Transit" },
    { icon: <UserIcon className="w-5 h-5" />, label: "Recipient", value: "John Doe" },
    { icon: <MapPinIcon className="w-5 h-5" />, label: "Destination", value: "1 Infinite Loop, Cupertino, CA" },
    { icon: <ScaleIcon className="w-5 h-5" />, label: "Weight", value: "2.5kg" },
    { icon: <CurrencyDollarIcon className="w-5 h-5" />, label: "Delivery Fee", value: "Kshs. 1,000" },
  ];

  return (
    <div className="flex h-screen font-sans bg-gray-100 overflow-hidden">
      
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col justify-between h-full">
        <div>
          <div className="p-6 text-2xl font-bold">Deliveroo</div>
          <nav className="mt-4 space-y-2">
            <SidebarItem icon={<HomeIcon className="w-5 h-5" />} text="Dashboard" />
            <SidebarItem icon={<PlusCircleIcon className="w-5 h-5" />} text="New Order" />
            <SidebarItem icon={<UserCircleIcon className="w-5 h-5" />} text="Profile" />
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <SidebarItem icon={<ArrowRightOnRectangleIcon className="w-5 h-5" />} text="Logout" />
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col h-full">
       
        <header className="flex justify-between items-center bg-white px-4 md:px-6 py-4 shadow shrink-0">
          <div className="flex items-center gap-4">
            
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Deliveroo</h1>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </header>

        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Shipment Details</h2>
              <p className="text-gray-600 font-medium">Tracking ID: SWP001</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => setChangeModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-200 px-4 py-2 rounded font-semibold hover:bg-gray-300"
              >
                <PencilSquareIcon className="w-5 h-5" />
                Change Destination
              </button>
              <button
                onClick={() => setCancelModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
              >
                <XMarkIcon className="w-5 h-5" />
                Cancel Order
              </button>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-gray-200 h-64 md:h-72 rounded-lg flex items-center justify-center border">
                <p className="text-gray-500">[Map Placeholder]</p>
              </div>
            </div>

           
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4">Route Details</h3>
              <ul className="space-y-4">
                {routeUpdates.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span
                      className={`w-3 h-3 mt-1 rounded-full ${
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
            <h3 className="font-bold text-lg mb-4">Shipping Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      
      <AnimatePresence>
        {isSidebarOpen && (
          <ModalOverlay onClose={() => setSidebarOpen(false)}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.15 }}
              className="bg-gray-900 text-white w-64 h-full flex flex-col justify-between"
            >
              <div>
                <div className="p-6 text-2xl font-bold">Deliveroo</div>
                <nav className="mt-4 space-y-2">
                  <SidebarItem icon={<HomeIcon className="w-5 h-5" />} text="Dashboard" />
                  <SidebarItem icon={<PlusCircleIcon className="w-5 h-5" />} text="New Order" />
                  <SidebarItem icon={<UserCircleIcon className="w-5 h-5" />} text="Profile" />
                </nav>
              </div>
              <div className="p-4 border-t border-gray-700">
                <SidebarItem icon={<ArrowRightOnRectangleIcon className="w-5 h-5" />} text="Logout" />
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {isChangeModalOpen && (
          <ModalOverlay onClose={() => setChangeModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.15 }}
              className="bg-white p-6 rounded-lg shadow w-[90%] max-w-md"
            >
              <h3 className="text-xl font-bold mb-2">Change Destination</h3>
              <p className="text-gray-700 mb-4">
                Once the address has been changed, an email will be sent.
              </p>

              {/* Saved addresses dropdown */}
              <select
                className="w-full border rounded p-3 mb-4 focus:ring focus:ring-blue-300"
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
                className="w-full border rounded p-3 mb-2 focus:ring focus:ring-blue-300"
              />

              {destTouched && destError && (
                <p className="text-red-500 text-sm mb-2">{destError}</p>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded font-semibold"
                  onClick={() => setChangeModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={!isDestValid}
                  onClick={handleSaveDestination}
                  className={`px-4 py-2 rounded text-white font-semibold ${
                    isDestValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300"
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
              className="bg-white p-6 rounded-lg shadow w-[90%] max-w-md"
            >
              <h3 className="text-xl font-bold mb-2">Cancel Order</h3>
              <p className="mb-4 text-gray-700">
                Are you sure? Once you cancel this order, an email will be sent to you to confirm cancellation.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  ref={cancelNoBtnRef}
                  className="bg-gray-200 px-4 py-2 rounded font-semibold"
                  onClick={() => setCancelModalOpen(false)}
                >
                  No
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
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



function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 cursor-pointer select-none">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-start gap-3">
      {icon}
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-gray-900 font-semibold">{value}</p>
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
