import React from "react";
import AdminTopBar from "./common/AdminTopBar";
import AdminSidebar from "./AdminSidebar";
import Footer from "./common/Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen">
        <aside className="w-full basis-[10%]">
          <AdminSidebar />
        </aside>

        <main className="w-full basis-[90%] overflow-y-auto">
          <AdminTopBar />
          <div className="p-4">{children}</div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
