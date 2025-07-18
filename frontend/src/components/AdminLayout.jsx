import React from 'react'
import Topbar from './common/Topbar';
import AdminSidebar from './AdminSidebar';
import Footer from './common/Footer';

const AdminLayout = ({children}) => {
  return (
    <>
      <div className="flex w-full p-6">
        <AdminSidebar />

        <div className="basis-[84%]">
          <Topbar />
          {children}
          
        </div>
        
      </div>
      <Footer/>
    </>
  );
}

export default AdminLayout