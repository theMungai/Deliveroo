import React from 'react'
import AdminTopBar from './common/AdminTopBar';
import AdminSidebar from './AdminSidebar';
import Footer from './common/Footer';

const AdminLayout = ({children}) => {
  return (
    <>
      <div className="flex w-full p-0">
        <AdminSidebar />

        <div className="basis-[84%]">
          <AdminTopBar />
          {children}
          
        </div>
        
      </div>
      <Footer/>
    </>
  );
}

export default AdminLayout