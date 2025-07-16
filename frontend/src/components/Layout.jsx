import React from "react";
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";

function Layout({ children }) {
  return (
    <>
      <div className="flex w-full p-6">
        <Sidebar />

        <div className="basis-[84%]">
          <Topbar/>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
