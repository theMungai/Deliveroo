import React from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";
import Footer from "./common/Footer";

function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      
      <div className="flex flex-col basis-[84%] min-h-screen">
        <Topbar />
        
        {/* Main content + grow */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}


export default Layout;
