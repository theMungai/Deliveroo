import React, { useState } from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import Footer from "./common/Footer";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden relative">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block w-[150px]">
        <Sidebar />
      </aside>

      {/* Sidebar (mobile) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0000009f] bg-opacity-40">
          <div className="w-[150px] h-full">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-grow p-4 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
