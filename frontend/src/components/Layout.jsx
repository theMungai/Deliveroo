import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import Footer from "./common/Footer";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-gray-50 relative">
      {/* Sidebar (toggle on small screens) */}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-[#1616167a] bg-opacity-40">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-grow px-4 py-6 md:px-8 overflow-y-auto bg-gray-50">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
