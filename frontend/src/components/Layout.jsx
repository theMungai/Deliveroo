import React from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import Footer from "./common/Footer";

function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col basis-[84%] min-h-screen">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-grow px-4 py-6 md:px-8 overflow-y-auto bg-gray-50">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
